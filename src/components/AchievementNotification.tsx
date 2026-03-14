import { Achievement } from '../types/game';

interface AchievementNotificationProps {
  notifications: { id: number; achievement: Achievement }[];
  onClose: (id: number) => void;
}

export function AchievementNotification({ notifications, onClose }: AchievementNotificationProps) {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-yellow-900/20 backdrop-blur-sm" />
      
      {notifications.map(({ id, achievement }) => (
        <div 
          key={id} 
          className="relative z-10 bg-gradient-to-br from-yellow-800 to-yellow-950 border-2 border-yellow-500 rounded-2xl p-6 max-w-md mx-4 shadow-2xl animate-fade-in pointer-events-auto"
        >
          <div className="text-center mb-4">
            <div className="text-6xl mb-3 animate-bounce">🏆</div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">成就解锁！</h2>
            <h3 className="text-2xl font-bold text-yellow-300">{achievement.name}</h3>
          </div>

          <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-4 mb-4">
            <p className="text-yellow-200 text-center">{achievement.description}</p>
          </div>

          {achievement.reward.coins && (
            <div className="mb-2 text-center">
              <span className="text-yellow-400 font-semibold">奖励：+{achievement.reward.coins} 哈夫币</span>
            </div>
          )}

          {(achievement.reward.dropRateBoost || achievement.reward.clickMultiplierBoost) && (
            <div className="mb-2 text-center">
              <span className="text-yellow-400 font-semibold">
                奖励：+{achievement.reward.dropRateBoost || achievement.reward.clickMultiplierBoost}% {achievement.reward.dropRateBoost ? '掉率' : '点击收益'}
              </span>
            </div>
          )}

          {achievement.reward.skin && (
            <div className="mb-2 text-center">
              <span className="text-yellow-400 font-semibold">奖励：{achievement.reward.skin === 'goldenMouse' ? '金色鼠鼠' : '金光鼠鼠'}皮肤</span>
            </div>
          )}

          {achievement.reward.title && (
            <div className="mb-2 text-center">
              <span className="text-yellow-400 font-semibold">奖励：{achievement.reward.title} 称号</span>
            </div>
          )}

          <div className="text-center mt-6">
            <button
              onClick={() => onClose(id)}
              className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-xl font-semibold transition-colors"
            >
              太棒了！
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
