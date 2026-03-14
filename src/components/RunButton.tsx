import { useRef, useState, useEffect } from 'react';
import { CoinParticle } from '../types/game';

interface RunButtonProps {
  onClick: (x: number, y: number) => void;
  isRunning: boolean;
  particles: CoinParticle[];
  isNegative?: boolean;
  lastResult?: { value: number; isNegative: boolean } | null;
}

export function RunButton({ onClick, isRunning, particles, isNegative = false, lastResult }: RunButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (lastResult) {
      setShowResult(true);
      setTimeout(() => setShowResult(false), 1500);
    }
  }, [lastResult]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      onClick(x, y);
    }
  };

  const buttonClass = isNegative
    ? 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 shadow-lg shadow-red-900/50 border-2 border-red-400/30'
    : 'bg-gradient-to-r from-military-green to-green-600 hover:from-green-500 hover:to-green-600 shadow-lg shadow-green-900/50 border-2 border-green-400/30';

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`
          relative overflow-hidden
          px-8 py-6 md:px-12 md:py-8
          text-xl md:text-2xl font-bold
          rounded-2xl
          text-white 
          transform transition-all duration-150
          active:scale-95
          ${buttonClass}
          ${isRunning ? 'animate-pulse-fast scale-95' : 'hover:scale-105'}
        `}
      >
        <div className="flex items-center gap-3">
          <span className={`text-3xl md:text-4xl ${isRunning ? 'animate-bounce' : ''}`}>
            🐭
          </span>
          <span className="drop-shadow-lg">跑刀一下！</span>
          <span className="text-2xl md:text-3xl">🗡️</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 pointer-events-none" />
        
        {isRunning && !isNegative && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-pulse" />
        )}
        {isNegative && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent animate-pulse" />
        )}
      </button>
      
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none animate-coin-fly"
          style={{
            left: particle.x,
            top: particle.y,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${index * 50}ms`,
          }}
        >
          <span className="text-2xl">💰</span>
          <span className="absolute -top-2 left-full ml-1 text-yellow-400 font-bold text-sm whitespace-nowrap">
            +{particle.value}
          </span>
        </div>
      ))}

      {showResult && lastResult && (
        <div
          className="absolute pointer-events-none animate-coin-fly"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className={`text-4xl font-bold drop-shadow-lg ${lastResult.isNegative ? 'text-red-500' : 'text-green-400'}`}>
            {lastResult.isNegative ? '-' : '+'}{lastResult.value}
          </span>
        </div>
      )}
    </div>
  );
}
