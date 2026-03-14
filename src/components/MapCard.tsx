import { GameMap } from '../types/game';

interface MapCardProps {
  map: GameMap;
  isCurrent: boolean;
  canAfford: boolean;
  onEnter: () => void;
}

export function MapCard({ map, isCurrent, canAfford, onEnter }: MapCardProps) {
  const difficultyStyles = {
    普通: {
      badge: 'text-green-400 bg-green-900/50',
      glow: 'shadow-green-500/30',
      border: 'border-green-700',
    },
    机密: {
      badge: 'text-yellow-400 bg-yellow-900/50',
      glow: 'shadow-yellow-500/30',
      border: 'border-yellow-700',
    },
    绝密: {
      badge: 'text-red-400 bg-red-900/50',
      glow: 'shadow-red-500/30',
      border: 'border-red-700',
    },
  };

  const style = difficultyStyles[map.difficulty];

  return (
    <div
      className={`relative p-0 rounded-xl overflow-hidden transition-all duration-300 border-2 ${
        isCurrent
          ? `${style.border} bg-gray-900/80 shadow-xl ${style.glow}`
          : 'border-gray-700 bg-gray-900/60 hover:border-gray-600 hover:bg-gray-800/60'
      }`}
    >
      <div className="relative p-4">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-50" />

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white tracking-wide">{map.name}</h3>
          <span
            className={`px-2 py-0.5 rounded text-xs font-semibold ${style.badge}`}
          >
            {map.difficulty}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-purple-400">🎲</span>
            <span className="text-purple-300">掉率:</span>
            <span className="text-purple-400 font-bold">+{map.dropRateBonus}%</span>
          </div>
        </div>

        {isCurrent ? (
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2 text-green-400 font-bold">
              <span>✓</span>
              <span>当前地图</span>
            </div>
          </div>
        ) : (
          <button
            className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              canAfford
                ? 'bg-gradient-to-r from-military-green to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-lg'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
            onClick={onEnter}
            disabled={!canAfford}
          >
            {canAfford ? (
              <>
                <span>🎯</span>
                <span>进入此地图</span>
                <span className="text-xs opacity-80">({map.entranceCost === 0 ? '免费' : `消耗 ${map.entranceCost.toLocaleString()}`})</span>
              </>
            ) : (
              <>
                <span>🔒</span>
                <span>哈夫币不足</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
