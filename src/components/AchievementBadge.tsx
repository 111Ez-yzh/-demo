interface AchievementBadgeProps {
  unlockedCount: number;
  totalCount: number;
  onClick: () => void;
}

export function AchievementBadge({ unlockedCount, totalCount, onClick }: AchievementBadgeProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 bg-yellow-900/50 border border-yellow-700/50 rounded-full hover:bg-yellow-900/70 transition-colors cursor-pointer"
    >
      <span className="text-yellow-400 text-lg">🏆</span>
      <span className="text-yellow-300 text-sm font-semibold">
        {unlockedCount}/{totalCount}
      </span>
    </button>
  );
}
