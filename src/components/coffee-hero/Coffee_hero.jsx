import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";

gsap.registerPlugin(ScrollTrigger);

const bagImage = "/Images/coffee-bag.png";
const beanImage = "/Images/coffee-bean.png";

export function CoffeeHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const bagRef = useRef(null);
  
  const beanCountRef = useRef(0);
  const maxBean = 80;

  useEffect(() => {
    if (window.history && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const engineInstance = Matter.Engine.create();
    const render = Matter.Render.create({
      canvas: canvasRef.current,
      engine: engineInstance,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: "transparent",
        wireframes: false,
      }
    });

    Matter.Events.on(render, 'beforeRender', () => {
      if (render.context) {
        render.context.filter = 'brightness(0.55) contrast(1.15)';
      }
    });

    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight - 25,
      window.innerWidth,
      50,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    Matter.Composite.add(engineInstance.world, [ground]);
    Matter.Render.run(render);
    
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engineInstance);

    const tl = gsap.timeline({ paused: true });

    // Lowered float height factor to 0.40
    const floatHeightFactor = 0.40; 

    tl.to(bagRef.current, { y: -window.innerHeight * floatHeightFactor, duration: 2, ease: "power1.inOut" }, 0)
      .to("#quote-text", { opacity: 1, duration: 1 }, 0.5)
      .to(bagRef.current, { rotate: -45, duration: 1, ease: "power2.inOut" }, 2) 
      .to(bagRef.current, { rotate: 0, duration: 0.5, ease: "power2.inOut" }, 3) 
      .to(bagRef.current, { y: 5, duration: 1.2, ease: "power3.in" }, 3.5)
      .to("#brand-text", { opacity: 1, duration: 1 }, 3.5);

    let animationLocked = false;
    let hasImpacted = false;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=4000", 
      pin: true,
      onUpdate: (self) => {
        if (!animationLocked) {
          gsap.to(tl, { 
            progress: self.progress, 
            duration: 0.8, 
            ease: "power2.out", 
            overwrite: true 
          });
          
          if (self.progress > 0.55 && self.progress < 0.72 && self.direction === 1) {
            let beansToSpawnThisFrame = 2; 
            while (beansToSpawnThisFrame > 0 && beanCountRef.current < maxBean) {
              spawnBean(engineInstance, floatHeightFactor);
              beansToSpawnThisFrame--;
            }
          }

          if (self.progress > 0.85 && !hasImpacted) {
             triggerBagImpact(engineInstance);
             hasImpacted = true;
          } else if (self.progress < 0.85 && hasImpacted) {
             hasImpacted = false;
          }
        }
      },
      onLeave: () => {
        animationLocked = true;
        gsap.to(tl, { progress: 1, duration: 0.8, ease: "power2.out" });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engineInstance);
    };
  }, []);

  const spawnBean = (currentEngine, floatFactor) => {
    if (!currentEngine || beanCountRef.current >= maxBean) return;
    
    beanCountRef.current += 1;

    const startX = window.innerWidth / 2 - 140; 
    const startY = window.innerHeight - 50 - (window.innerHeight * floatFactor) - 220; 

    const beanWidth = 28;
    const beanHeight = 18;

    const bean = Matter.Bodies.rectangle(
      startX + (Math.random() * 30 - 15), 
      startY + (Math.random() * 10 - 5), 
      beanWidth, 
      beanHeight, 
      {
        chamfer: { radius: beanHeight / 2 }, 
        restitution: 0.2, 
        friction: 0.6,
        render: {
          sprite: {
            texture: beanImage,
            xScale: 0.08,
            yScale: 0.08
          }
        }
      }
    );

    if (bean) {
      Matter.Composite.add(currentEngine.world, bean);
    }
  };
  
  const triggerBagImpact = (currentEngine) => {
     if (!currentEngine) return;
     const impactBody = Matter.Bodies.rectangle(
       window.innerWidth / 2, 
       window.innerHeight - 100, 
       200, 50, 
       { 
         mass: 3, 
         render: { visible: false } 
       }
     );
     Matter.Body.setVelocity(impactBody, { x: 0, y: 10 }); 
     Matter.Composite.add(currentEngine.world, impactBody);
     
     setTimeout(() => {
         Matter.Composite.remove(currentEngine.world, impactBody);
     }, 1000);
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen main-bg overflow-hidden">
       
       <div className="absolute inset-0 flex items-center justify-between px-12 md:px-24 pointer-events-none z-10">
          <div className="text-left w-1/3 opacity-0" id="quote-text">
             <h2 className="text-2xl md:text-4xl font-serif text-[#3E2723] italic">
               "Elevating your morning... literally."
             </h2>
          </div>
          <div className="text-right w-1/3 opacity-0" id="brand-text">
             <h1 className="text-4xl md:text-6xl font-serif text-[#3E2723] font-bold tracking-tight">
               Mondulkiri
             </h1>
             <h2 className="text-2xl md:text-3xl font-serif text-[#3E2723] mt-2">
               Estate Coffee
             </h2>
             <p className="text-md md:text-lg text-[#5D4037] mt-4 font-light tracking-widest uppercase">
               Premium Blend
             </p>
          </div>
       </div>
       
       <div className="absolute inset-0 z-20 pointer-events-none">
          <canvas ref={canvasRef} className="w-full h-full" />
       </div>

       <div className="absolute bottom-0 left-0 w-full h-12.5 bg-[#2d1b15] z-30 shadow-2xl"></div>

       <div className="absolute bottom-12.5 left-1/2 -translate-x-1/2 z-40" ref={bagRef}>
          <img 
             src={bagImage} 
             alt="Mondulkiri Coffee Bag" 
             className="w-75 h-105 object-contain drop-shadow-2xl"
          />
       </div>
    </div>
  );
}