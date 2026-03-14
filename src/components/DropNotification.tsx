import { DropNotification as DropNotificationType } from '../types/game';

interface DropNotificationProps {
  notifications: DropNotificationType[];
}

export function DropNotification({ notifications }: DropNotificationProps) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="relative px-6 py-4 bg-gradient-to-r from-yellow-900/95 via-amber-900/95 to-yellow-900/95 border-2 border-yellow-500 rounded-xl shadow-2xl shadow-yellow-500/30 animate-bounce"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-3xl">✨</div>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{notification.item.emoji}</span>
            <div>
              <p className="text-yellow-200 text-sm font-medium">恭喜！获得</p>
              <p className="text-yellow-400 text-xl font-bold">{notification.item.name}</p>
              <p className="text-green-400 text-sm font-semibold">
                +{notification.item.coinsPerSecond} 哈夫币/秒
              </p>
            </div>
          </div>
          <div className="absolute inset-0 border border-yellow-400/20 rounded-xl animate-pulse pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
