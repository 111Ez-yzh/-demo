

interface MouseRunnerProps {
  isRunning: boolean;
  isNegative?: boolean;
}

export function MouseRunner({ isRunning, isNegative = false }: MouseRunnerProps) {
  return (
    <div className="w-full h-40 flex items-center justify-center relative overflow-visible">
      <div
        className={`relative transform-gpu ${
          isNegative && isRunning ? 'animate-mouse-hurt' : 
          isRunning ? 'animate-run-attack' : 'animate-idle-bob'
        }`}
      >
        {isRunning && !isNegative && (
          <div className="absolute -inset-8 rounded-full bg-gradient-radial from-yellow-400/40 via-transparent to-transparent animate-attack-effect pointer-events-none" />
        )}
        {isRunning && isNegative && (
          <div className="absolute -inset-8 rounded-full bg-gradient-radial from-red-400/40 via-transparent to-transparent animate-attack-effect pointer-events-none" />
        )}
        
        <div className="text-6xl">
          {isNegative ? '😵' : '🐭'}
        </div>
        
        {!isNegative && (
          <div
            className={`absolute top-0 right-0 text-4xl transform-gpu ${
              isRunning ? 'animate-sword-flash' : ''
            }`}
            style={{ right: '-40px', top: '-5px' }}
          >
            🗡️
          </div>
        )}
        {isNegative && isRunning && (
          <div
            className="absolute top-0 right-0 text-4xl transform-gpu animate-sword-drop"
            style={{ right: '-40px', top: '-5px' }}
          >
            🗡️
          </div>
        )}
        
        {isRunning && !isNegative && (
          <>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg animate-coin-fly" style={{ animationDelay: '0s' }}>💥</div>
            <div className="absolute -top-4 left-1/3 text-sm animate-coin-fly" style={{ animationDelay: '0.1s' }}>⭐</div>
            <div className="absolute -top-3 right-1/3 text-sm animate-coin-fly" style={{ animationDelay: '0.15s' }}>✨</div>
          </>
        )}
        {isRunning && isNegative && (
          <>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg animate-coin-fly" style={{ animationDelay: '0s' }}>💢</div>
            <div className="absolute -top-4 left-1/3 text-sm animate-coin-fly" style={{ animationDelay: '0.1s' }}>💸</div>
          </>
        )}
      </div>
    </div>
  );
}
