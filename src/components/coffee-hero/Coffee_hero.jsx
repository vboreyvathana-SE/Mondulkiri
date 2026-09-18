// CoffeeHero.jsx
import { useBeanPhysics } from './useBeansPhysic';

export function CoffeeHero() {
  const canvasRef = useBeanPhysics();
  return (
    <div className="relative h-screen overflow-hidden bg-linear-to-r from-[#120b08] via-[#1a110d] to-[#211611]">
      <canvas ref={canvasRef} width={810} height={600} className="mx-auto" />
    </div>
  );
}