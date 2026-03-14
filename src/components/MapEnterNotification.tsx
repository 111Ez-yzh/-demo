interface MapEnterNotificationProps {
  show: boolean;
  mapName: string;
  dropRate: number;
}

export function MapEnterNotification({ show, mapName, dropRate }: MapEnterNotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="relative px-8 py-4 bg-gradient-to-r from-green-900/95 via-emerald-900/95 to-green-900/95 border-2 border-green-500 rounded-xl shadow-2xl shadow-green-500/30">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">🎯</div>
        <div className="text-center mt-1">
          <p className="text-green-200 text-sm font-medium">已进入</p>
          <p className="text-green-400 text-2xl font-bold">{mapName}</p>
          <p className="text-yellow-400 text-lg font-semibold mt-1">
            大红掉率: {dropRate}%
          </p>
        </div>
        <div className="absolute inset-0 border border-green-400/20 rounded-xl animate-pulse pointer-events-none" />
      </div>
    </div>
  );
}
