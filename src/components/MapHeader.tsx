import { GameMap } from '../types/game';

interface MapHeaderProps {
  map: GameMap;
  dropRate: number;
}

export function MapHeader({ map, dropRate }: MapHeaderProps) {
  const difficultyColors = {
    普通: 'from-green-600 to-green-800',
    机密: 'from-yellow-600 to-orange-700',
    绝密: 'from-red-600 to-red-800',
  };

  return (
    <div className="text-center mb-4">
      <div className="inline-block">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
          {map.name}
        </h1>
        <div
          className={`h-1 w-full rounded-full bg-gradient-to-r ${difficultyColors[map.difficulty]}`}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-3 mb-4">
        <p className="text-gray-400 text-sm md:text-base">
          难度: <span className="text-white font-semibold">{map.difficulty}</span>
        </p>
      </div>
      <div className="inline-flex items-center gap-2 bg-purple-900/50 border border-purple-600/50 rounded-lg px-6 py-3">
        <span className="text-2xl">🎲</span>
        <div className="text-left">
          <div className="text-purple-300 text-sm">当前大红掉率</div>
          <div className="text-purple-200 font-bold text-2xl">{dropRate}%</div>
        </div>
      </div>
    </div>
  );
}
