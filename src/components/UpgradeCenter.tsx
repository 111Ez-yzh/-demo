import { GameState } from '../types/game';

interface UpgradeCenterProps {
  gameState: GameState;
  coins: number;
  getUpgradePrice: (upgradeId: string) => number;
  purchaseUpgrade: (upgradeId: string) => boolean;
  upgradeFlash: string | null;
  upgradeFloatText: string | null;
}

export function UpgradeCenter({
  gameState,
  coins,
  getUpgradePrice,
  purchaseUpgrade,
  upgradeFlash,
  upgradeFloatText,
}: UpgradeCenterProps) {
  return (
    <div className="bg-black/30 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">⚙️</span>
        <h2 className="text-xl font-bold text-military-green-light">
          鼠鼠升级中心
        </h2>
      </div>

      <div className="space-y-4">
        <div className={`bg-black/30 rounded-xl p-4 border border-gray-600/30 relative overflow-hidden ${upgradeFlash === 'click_multiplier' ? 'animate-flash-green' : ''}`}>
          {upgradeFloatText && upgradeFlash === 'click_multiplier' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-400 font-bold text-xl animate-float-up">
              +35% 收益
            </div>
          )}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-green-300">
                极限跑刀训练
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                训练鼠鼠的刀法，让每一次跑刀都更值钱
              </p>
            </div>
            <div className="text-right">
              <span className="text-yellow-400 font-bold text-lg">
                Lv.{gameState.upgrades.clickMultiplier}
              </span>
              <p className="text-green-400 text-sm">
                +{gameState.upgrades.clickMultiplier * 35}% 收益
              </p>
            </div>
          </div>
          <button
            onClick={() => purchaseUpgrade('click_multiplier')}
            disabled={coins < getUpgradePrice('click_multiplier')}
            className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
              coins >= getUpgradePrice('click_multiplier')
                ? 'bg-green-600 hover:bg-green-500 text-white active:scale-95'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            升级 - {getUpgradePrice('click_multiplier')} 哈夫币
          </button>
        </div>

        <div className={`bg-black/30 rounded-xl p-4 border border-gray-600/30 relative overflow-hidden ${upgradeFlash === 'drop_rate_boost' ? 'animate-flash-green' : ''}`}>
          {upgradeFloatText && upgradeFlash === 'drop_rate_boost' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-400 font-bold text-xl animate-float-up">
              {upgradeFloatText}
            </div>
          )}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-purple-300">
                大红感知训练
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                让跑刀鼠鼠对珍贵大红更加敏感，无论进入哪个地图都能更容易发现
              </p>
            </div>
            <div className="text-right">
              <span className="text-yellow-400 font-bold text-lg">
                Lv.{gameState.upgrades.dropRateBoost}
              </span>
              <p className="text-purple-400 text-sm">
                +{gameState.upgrades.dropRateBoost}% 掉率
              </p>
            </div>
          </div>
          <button
            onClick={() => purchaseUpgrade('drop_rate_boost')}
            disabled={coins < getUpgradePrice('drop_rate_boost')}
            className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${
              coins >= getUpgradePrice('drop_rate_boost')
                ? 'bg-purple-600 hover:bg-purple-500 text-white active:scale-95'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            升级 - {getUpgradePrice('drop_rate_boost')} 哈夫币
          </button>
        </div>
      </div>
    </div>
  );
}
