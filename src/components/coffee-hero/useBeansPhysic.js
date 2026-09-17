// useBeanPhysics.js
import { useRef, useEffect } from 'react';
import Matter from 'matter-js';

export function useBeanPhysics() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const engine = Matter.Engine.create();
        const world = engine.world;

        const ground = Matter.Bodies.rectangle(400, 590, 810, 20, { isStatic: true });
        Matter.World.add(world, ground);

        const beans = [];
        let beanCount = 0;
        const maxBeans = 150;
        const settleDelay = 2500; // ms to let physics settle after last bean lands

        function spawnBean() {
            if (beanCount >= maxBeans) return;
            const x = 400 + (Math.random() * 20 - 10);
            const bean = Matter.Bodies.circle(x, 0, 8, {
                friction: 1,
                frictionStatic: 1,
                restitution: 0.05,
                angle: Math.random() * Math.PI * 2,
            });

            const roastShades = ['#4a2f1c', '#3b2417', '#2e1a0f', '#55361f'];
            bean.plugin.color = roastShades[Math.floor(Math.random() * roastShades.length)];

            Matter.World.add(world, bean);
            beans.push(bean);
            beanCount++;

            if (beanCount === maxBeans) {
                clearInterval(spawnInterval);
                setTimeout(freezeBeans, settleDelay);
            }

        }

        function freezeBeans() {
            for (const bean of beans) {
                Matter.Body.setStatic(bean, true);
            }
        }

        const spawnInterval = setInterval(spawnBean, 40);

        let frameId;
        function loop() {
            Matter.Engine.update(engine, 1000 / 60);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#555';
            ctx.fillRect(400 - 405, 590 - 10, 810, 20);
            drawPileBase()


            for (const bean of beans) {
                const { x, y } = bean.position;
                const angle = bean.angle;

                // drop shadow — WORLD space, drawn before rotate() so it never spins with the bean
                ctx.beginPath();
                ctx.ellipse(x + 2, y + 3, 9, 5, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
                ctx.fill();

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle);

                // bean body — now using the color assigned once at spawn
                ctx.beginPath();
                ctx.ellipse(0, 0, 10, 6, 0, 0, Math.PI * 2);
                ctx.fillStyle = bean.plugin.color;
                ctx.fill();

                // highlight sheen — rotates WITH the bean, local space
                ctx.beginPath();
                ctx.ellipse(-3, -2, 3, 1.5, 0, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.fill();

                // center crease
                ctx.beginPath();
                ctx.moveTo(0, -5);
                ctx.quadraticCurveTo(2, 0, 0, 5);
                ctx.strokeStyle = '#1f120a';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();
            } frameId = requestAnimationFrame(loop);

        }

        const SETTLE_SPEED = 0.5; // tune this — explained below

        function isSettled(bean) {
            const v = bean.velocity;
            const speed = Math.sqrt(v.x * v.x + v.y * v.y);
            return speed < SETTLE_SPEED;
        }

        function drawPileBase() {
            const settledBeans = beans.filter(isSettled);   
            if (settledBeans.length === 0) return;

            const binWidth = 10;
            const groundY = 580;
            const bins = new Map();

            for (const bean of settledBeans) {
                const binIndex = Math.floor(bean.position.x / binWidth);
                const topY = bean.position.y - 6;
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
        } loop();

        return () => {
            clearInterval(spawnInterval);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return canvasRef;
}