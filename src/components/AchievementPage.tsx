import { ACHIEVEMENTS } from '../types/game';
import { AchievementCard } from './AchievementCard';

interface AchievementPageProps {
  achievementProgress: Record<string, { progress: number; unlocked: boolean; claimed: boolean }>;
}

export function AchievementPage({ achievementProgress }: AchievementPageProps) {
  const unlockedCount = Object.values(achievementProgress).filter(a => a.unlocked).length;

  return (
    <div>
      <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
        <div className="text-center">
          <span className="text-yellow-200 font-bold text-lg">
            已解锁 {unlockedCount}/12 成就
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map((achievement) => {
          const progress = achievementProgress[achievement.id] || { progress: 0, unlocked: false, claimed: false };
          return (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              progress={progress.progress}
              unlocked={progress.unlocked}
            />
          );
        })}
      </div>
    </div>
  );
}
