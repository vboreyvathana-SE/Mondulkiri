// CoffeeHero.jsx
import { useBeanPhysics } from './useBeansPhysic';

export function CoffeeHero() {
  const canvasRef = useBeanPhysics();
  return (
    <div className="relative w-full h-screen bg-[#1a1a1a]">
      <canvas ref={canvasRef} width={810} height={600} className="mx-auto" />
    </div>
  );
}