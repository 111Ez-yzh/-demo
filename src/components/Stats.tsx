interface StatsProps {
  totalClicks: number;
  totalCoinsEarned: number;
}

export function Stats({ totalClicks, totalCoinsEarned }: StatsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
        <span className="text-xl">🖱️</span>
        <span className="text-gray-400">跑刀次数:</span>
        <span className="text-military-green-light font-bold">
          {totalClicks.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
        <span className="text-xl">💰</span>
        <span className="text-gray-400">总产出:</span>
        <span className="text-yellow-400 font-bold">
          {totalCoinsEarned.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
