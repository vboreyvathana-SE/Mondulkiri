// useBeanPhysics.js
import { useRef, useEffect } from 'react';
import Matter from 'matter-js';
import { createBag } from './Baganimation';

const MAX_BEANS = 150;
const BAKE_STEP_MS = 1000 / 60;   // fixed physics timestep while baking, independent of real time
const SPAWN_EVERY_N_FRAMES = 2;   // ~ every 40ms at 60fps, matching the old real-time spawn rate
const MAX_BAKE_FRAMES = 900;      // safety cap; baking normally finishes well before this
 
export function useBeanPhysics({ scrubMultiplier = 1.5 } = {}) {
    const canvasRef = useRef(null);
 
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
 
        // ---------- bake: run the whole sequence once, record every frame ----------
        const engine = Matter.Engine.create();
        engine.enableSleeping = true;
        const world = engine.world;
        Matter.World.add(world, Matter.Bodies.rectangle(400, 590, 810, 20, { isStatic: true }));
 
        const bag = createBag({ x: 400, restY: 150, tiltAngle: -1.1 });
        let pouring = false;
        bag.onPourStart = () => { pouring = true; };
 
        const beans = [];
 
        function spawnBean() {
            const spout = bag.getSpoutPosition();
            const x = spout.x + (Math.random() * 50 - 25);
            const y = spout.y;
            const baseRadius = 9 + Math.random() * 3;
 
            const bean = Matter.Bodies.circle(x, y, baseRadius, {
                friction: 0.4,
                frictionStatic: 0.5,
                restitution: 0.1,
                frictionAir: 0.02,
                angle: Math.random() * Math.PI * 2,
            });
            Matter.Body.scale(bean, 1.1, 0.9);
 
            const roastShades = ['#4a2f1c', '#3b2417', '#2e1a0f', '#55361f'];
            bean.plugin.color = roastShades[Math.floor(Math.random() * roastShades.length)];
            bean.plugin.rx = baseRadius * 1.1;
            bean.plugin.ry = baseRadius * 0.9;
 
            Matter.World.add(world, bean);
            beans.push(bean);
        }
 
        function isSettled(bean) {
            if (bean.isSleeping) return true;
            const v = bean.velocity;
            return Math.sqrt(v.x * v.x + v.y * v.y) < 0.5;
        }
 
        function pileBinsFor(settledBeans) {
            const binWidth = 10;
            const bins = new Map();
            for (const bean of settledBeans) {
                const binIndex = Math.floor(bean.position.x / binWidth);
                const topY = bean.position.y - bean.plugin.ry;
                if (!bins.has(binIndex) || topY < bins.get(binIndex)) {
                    bins.set(binIndex, topY);
                }
            }
            return [...bins.entries()].sort((a, b) => a[0] - b[0]);
        }
 
        const snapshots = [];
        let frame = 0;
 
        while (frame < MAX_BAKE_FRAMES) {
            bag.update();
 
            if (pouring && beans.length < MAX_BEANS && frame % SPAWN_EVERY_N_FRAMES === 0) {
                spawnBean();
            }
 
            Matter.Engine.update(engine, BAKE_STEP_MS);
 
            const settledBeans = beans.filter(isSettled);
 
            snapshots.push({
                bagX: bag.x,
                bagY: bag.y,
                bagRotation: bag.rotation,
                beans: beans.map((b) => ({
                    x: b.position.x,
                    y: b.position.y,
                    angle: b.angle,
                    rx: b.plugin.rx,
                    ry: b.plugin.ry,
                    color: b.plugin.color,
                })),
                pileBins: pileBinsFor(settledBeans),
                pileMinX: settledBeans.length ? Math.min(...settledBeans.map((b) => b.position.x)) : null,
                pileMaxX: settledBeans.length ? Math.max(...settledBeans.map((b) => b.position.x)) : null,
            });
 
            frame++;
 
            // stop baking once every bean has spawned and the pile has come to rest —
            // nothing after this point would look any different from the last frame
            if (beans.length === MAX_BEANS && settledBeans.length === beans.length) {
                break;
            }
        }
 
        // ---------- scrub: map scroll position to a baked frame and draw it ----------
        function getProgress() {
            const rect = canvas.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const totalDistance = vh + rect.height * scrubMultiplier;
            const scrolled = vh - rect.top;
            return Math.min(Math.max(scrolled / totalDistance, 0), 1);
        }
 
        function drawSnapshot(snapshot) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#555';
            ctx.fillRect(400 - 405, 590 - 10, 810, 20);
 
            if (snapshot.pileBins.length > 0) {
                const groundY = 580;
                ctx.beginPath();
                ctx.moveTo(snapshot.pileMinX - 10, groundY);
                for (const [binIndex, topY] of snapshot.pileBins) {
                    ctx.lineTo(binIndex * 10 + 5, topY);
                }
                ctx.lineTo(snapshot.pileMaxX + 10, groundY);
                ctx.closePath();
                ctx.fillStyle = '#1f130b';
                ctx.fill();
            }
 
            // reuse the bag's own draw() by feeding it this frame's recorded pose
            bag.x = snapshot.bagX;
            bag.y = snapshot.bagY;
            bag.rotation = snapshot.bagRotation;
            bag.draw(ctx);
 
            for (const b of snapshot.beans) {
                ctx.beginPath();
                ctx.ellipse(b.x + 2, b.y + 3, b.rx * 0.9, b.ry * 0.85, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
                ctx.fill();
 
                ctx.save();
                ctx.translate(b.x, b.y);
                ctx.rotate(b.angle);
                ctx.beginPath();
                ctx.ellipse(0, 0, b.rx, b.ry, 0, 0, Math.PI * 2);
                ctx.fillStyle = b.color;
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(0, -b.ry * 0.85);
                ctx.quadraticCurveTo(2, 0, 0, b.ry * 0.85);
                ctx.strokeStyle = '#1f120a';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
 
                ctx.beginPath();
                ctx.ellipse(b.x - b.rx * 0.3, b.y - b.ry * 0.35, b.rx * 0.3, b.ry * 0.25, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.fill();
            }
        }
 
        let ticking = false;
        function render() {
            ticking = false;
            const progress = getProgress();
            const index = Math.min(Math.floor(progress * (snapshots.length - 1)), snapshots.length - 1);
            drawSnapshot(snapshots[Math.max(index, 0)]);
        }
 
        function onScrollOrResize() {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(render);
            }
        }
 
        render(); // paint whatever state the current scroll position corresponds to, immediately
        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize);
 
        return () => {
            window.removeEventListener('scroll', onScrollOrResize);
            window.removeEventListener('resize', onScrollOrResize);
        };
    }, [scrubMultiplier]);
 
    return canvasRef;
}