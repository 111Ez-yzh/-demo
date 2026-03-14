import { Achievement } from '../types/game';

interface AchievementCardProps {
  achievement: Achievement;
  progress: number;
  unlocked: boolean;
}

export function AchievementCard({ achievement, progress, unlocked }: AchievementCardProps) {
  return (
    <div className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${unlocked ? 'border-yellow-500 bg-gradient-to-br from-yellow-900/30 to-yellow-950/30 shadow-[0_0_20px_rgba(234,179,8,0.5)]' : 'border-gray-700 bg-gray-900/40 opacity-80'}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className={`font-bold text-lg ${unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
            {achievement.name}
          </h3>
          <p className={`text-sm mt-1 ${unlocked ? 'text-yellow-300' : 'text-gray-500'}`}>
            {achievement.description}
          </p>
        </div>
        <div className={`text-3xl ${unlocked ? 'text-yellow-400' : 'text-gray-500'}`}>
          {unlocked ? '✓' : '🔒'}
        </div>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden mb-3">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${unlocked ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 'bg-gray-600'}`}
          style={{ width: `${(progress / achievement.target) * 100}%` }}
        />
      </div>

      <div className={`text-xs ${unlocked ? 'text-yellow-500' : 'text-gray-500'}`}>
        {progress}/{achievement.target}
      </div>

      {achievement.reward.coins && (
        <div className={`absolute bottom-2 right-2 text-xs ${unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
          +{achievement.reward.coins} 哈夫币
        </div>
      )}

      {(achievement.reward.dropRateBoost || achievement.reward.clickMultiplierBoost) && (
        <div className={`absolute bottom-2 right-2 text-xs ${unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
          +{achievement.reward.dropRateBoost || achievement.reward.clickMultiplierBoost}%
        </div>
      )}

      {achievement.reward.skin && (
        <div className={`absolute bottom-2 right-2 text-xs ${unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
          皮肤奖励
        </div>
      )}

      {achievement.isHidden && !unlocked && (
        <div className="absolute inset-0 bg-gray-900/90 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">❓</div>
            <div className="text-gray-500 text-sm">隐藏成就</div>
          </div>
        </div>
      )}
    </div>
  );
}
