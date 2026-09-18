// useBeanPhysics.js
import { useRef, useEffect } from 'react';
import Matter from 'matter-js';

export function useBeanPhysics() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const engine = Matter.Engine.create();
        engine.enableSleeping = true; // resting beans go idle naturally instead of being frozen on a timer
        const world = engine.world;

        const ground = Matter.Bodies.rectangle(400, 590, 810, 20, { isStatic: true });
        Matter.World.add(world, ground);

        const beans = [];
        let beanCount = 0;
        const maxBeans = 150;

        function spawnBean() {
            if (beanCount >= maxBeans) return;
            const x = 400 + (Math.random() * 50 - 25); // was ±10
            // base radius before squashing into an oval — gives natural size variance bean-to-bean
            const baseRadius = 7 + Math.random() * 2.5;

            const bean = Matter.Bodies.circle(x, 0, baseRadius, {
                friction: 0.2,        // was 1 — lets beans slide past each other instead of gripping on contact
                frictionStatic: 0.2,  // slightly above kinetic friction (normal), but nowhere near the old 1
                restitution: 0.1,     // was 0.05 — a touch more bounce nudges beans sideways on impact instead of stacking straight down
                frictionAir: 0.02,
                angle: Math.random() * Math.PI * 2,
            });
            // squash the circular hull into an oval so the collision shape matches the drawn ellipse —
            // real beans interlock and leave gaps as they settle; round hitboxes just roll and pack like marbles
            Matter.Body.scale(bean, 1.25, 0.75);

            const roastShades = ['#4a2f1c', '#3b2417', '#2e1a0f', '#55361f'];
            bean.plugin.color = roastShades[Math.floor(Math.random() * roastShades.length)];
            bean.plugin.rx = baseRadius * 1.25;
            bean.plugin.ry = baseRadius * 0.75;

            Matter.World.add(world, bean);
            beans.push(bean);
            beanCount++;

            if (beanCount === maxBeans) {
                clearInterval(spawnInterval);
            }
        }

        const spawnInterval = setInterval(spawnBean, 40);

        let frameId;
        function loop() {
            Matter.Engine.update(engine, 1000 / 60);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#555';
            ctx.fillRect(400 - 405, 590 - 10, 810, 20);
            drawPileBase();

            for (const bean of beans) {
                const { x, y } = bean.position;
                const angle = bean.angle;
                const { rx, ry } = bean.plugin;

                // drop shadow — world space, scaled to this bean's own size, drawn before rotate()
                // so it never spins with the bean
                ctx.beginPath();
                ctx.ellipse(x + 2, y + 3, rx * 0.9, ry * 0.85, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
                ctx.fill();

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);

                // bean body
                ctx.beginPath();
                ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
                ctx.fillStyle = bean.plugin.color;
                ctx.fill();

                // center crease — a physical groove in the bean's surface, so it correctly
                // rotates WITH it, in local space
                ctx.beginPath();
                ctx.moveTo(0, -ry * 0.85);
                ctx.quadraticCurveTo(2, 0, 0, ry * 0.85);
                ctx.strokeStyle = '#1f120a';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();

                // specular highlight — comes from a fixed light source, so it's drawn in WORLD
                // space and stays roughly put as the bean tumbles beneath it, rather than
                // spinning with the bean's own rotation
                ctx.beginPath();
                ctx.ellipse(x - rx * 0.3, y - ry * 0.35, rx * 0.3, ry * 0.25, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.fill();
            }

            frameId = requestAnimationFrame(loop);
        }

        const SETTLE_SPEED = 0.5;

        function isSettled(bean) {
            if (bean.isSleeping) return true;
            const v = bean.velocity;
            return Math.sqrt(v.x * v.x + v.y * v.y) < SETTLE_SPEED;
        }

        function drawPileBase() {
            const settledBeans = beans.filter(isSettled);
            if (settledBeans.length === 0) return;

            const binWidth = 10;
            const groundY = 580;
            const bins = new Map();

            for (const bean of settledBeans) {
                const binIndex = Math.floor(bean.position.x / binWidth);
                const topY = bean.position.y - bean.plugin.ry;
                if (!bins.has(binIndex) || topY < bins.get(binIndex)) {
                    bins.set(binIndex, topY);
                }
            }

            const sortedBins = [...bins.entries()].sort((a, b) => a[0] - b[0]);
            const minX = Math.min(...settledBeans.map(b => b.position.x));
            const maxX = Math.max(...settledBeans.map(b => b.position.x));

            ctx.beginPath();
            ctx.moveTo(minX - 10, groundY);
            for (const [binIndex, topY] of sortedBins) {
                ctx.lineTo(binIndex * binWidth + binWidth / 2, topY);
            }
            ctx.lineTo(maxX + 10, groundY);
            ctx.closePath();
            ctx.fillStyle = '#1f130b';
            ctx.fill();
        }

        loop();

        return () => {
            clearInterval(spawnInterval);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return canvasRef;
}