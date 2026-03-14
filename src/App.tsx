import { useGameState } from './hooks/useGameState';
import { MAPS, COLLECTIBLES, ACHIEVEMENTS } from './types/game';
import { CoinDisplay } from './components/CoinDisplay';
import { MapCard } from './components/MapCard';
import { RunButton } from './components/RunButton';
import { MouseRunner } from './components/MouseRunner';
import { Stats } from './components/Stats';
import { SaveIndicator } from './components/SaveIndicator';
import { MapHeader } from './components/MapHeader';
import { DropNotification } from './components/DropNotification';
import { CollectionCard } from './components/CollectionCard';
import { MapEnterNotification } from './components/MapEnterNotification';
import { UpgradeCenter } from './components/UpgradeCenter';
import { BankruptcyButton } from './components/BankruptcyButton';
import { BankruptcyDialog } from './components/BankruptcyDialog';
import { AchievementPage } from './components/AchievementPage';
import { AchievementNotification } from './components/AchievementNotification';
import { AchievementBadge } from './components/AchievementBadge';

function App() {
  const {
    gameState,
    currentMap,
    particles,
    dropNotifications,
    isRunning,
    showSaveIndicator,
    showMapEnterNotification,
    collectionBonus,
    totalCoinsPerSecond,
    currentDropRate,
    clickMultiplier,
    getUpgradePrice,
    purchaseUpgrade,
    upgradeFlash,
    upgradeFloatText,
    isNegative,
    lastResult,
    getRiskConfig,
    handleClick,
    enterMap,
    setActiveTab,
    showBankruptcyDialog,
    setShowBankruptcyDialog,
    declareBankruptcy,
    achievementNotifications,
    setAchievementNotifications,
  } = useGameState();

  const isInDebt = gameState.coins < 0;
  const unlockedAchievements = Object.values(gameState.achievementProgress || {}).filter(a => a.unlocked).length;

  const handleCloseAchievementNotification = (id: number) => {
    setAchievementNotifications(prev => prev.filter(n => n.id !== id));
  };

  const collectedCount = Object.keys(gameState.collection).filter(k => gameState.collection[k] > 0).length;
  const totalCollectibles = COLLECTIBLES.length;
  const collectionProgress = (collectedCount / totalCollectibles) * 100;

  const riskConfig = getRiskConfig();
  const minPositiveEarning = Math.floor(riskConfig.minPositive * clickMultiplier);
  const maxPositiveEarning = Math.floor(riskConfig.maxPositive * clickMultiplier);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${currentMap.bgGradient} transition-all duration-700`}>
      <SaveIndicator show={showSaveIndicator} />
      <DropNotification notifications={dropNotifications} />
      <MapEnterNotification
        show={showMapEnterNotification.show}
        mapName={showMapEnterNotification.mapName}
        dropRate={showMapEnterNotification.dropRate}
      />
      <AchievementNotification
        notifications={achievementNotifications}
        onClose={handleCloseAchievementNotification}
      />

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="inline-flex items-center gap-2">
              <span className="text-3xl">🐭</span>
              <h1 className="text-2xl md:text-3xl font-bold text-military-green-light">
                跑刀鼠鼠
              </h1>
              <span className="text-3xl">🗡️</span>
            </div>
            <AchievementBadge
              unlockedCount={unlockedAchievements}
              totalCount={ACHIEVEMENTS.length}
              onClick={() => setActiveTab('achievements')}
            />
          </div>
          <CoinDisplay
            coins={gameState.coins}
            totalCoinsPerSecond={totalCoinsPerSecond}
            collectionBonus={collectionBonus}
            isNegative={isNegative}
          />
          <div className="mt-2 text-center">
            <span className="text-purple-400 text-sm">
              收藏馆：{collectedCount}/{totalCollectibles}（+{collectionBonus} /秒）
            </span>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section>
              <div className="bg-black/30 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <MapHeader
                  map={currentMap}
                  dropRate={currentDropRate}
                />

                <div className="flex justify-center my-6">
                  <div className="bg-black/30 rounded-xl p-4 border border-gray-600/30">
                    <MouseRunner
                      isRunning={isRunning}
                      isNegative={isNegative}
                    />
                  </div>
                </div>

                <div className="flex justify-center my-8">
                  <RunButton
                    onClick={handleClick}
                    isRunning={isRunning}
                    particles={particles}
                    isNegative={isNegative}
                    lastResult={lastResult}
                  />
                </div>

                <div className="text-center">
                  <div className="text-gray-500 text-sm mb-2">
                    <span className="text-orange-400 font-semibold">
                      ⚠️ 高难度地图风险更高，但潜在回报更大！
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm">
                    <span className="text-green-400">
                      成功: +{minPositiveEarning}~+{maxPositiveEarning} 哈夫币
                    </span>
                    <span className="text-gray-600 mx-2">|</span>
                    <span className="text-red-400">
                      失败: {riskConfig.minNegative}~{riskConfig.maxNegative} 哈夫币
                    </span>
                    <span className="text-gray-600 mx-2">|</span>
                    <span className="text-red-400">
                      失败概率: {riskConfig.negativeChance}%
                    </span>
                    <span className="text-purple-400 ml-2">
                      | {currentDropRate}% 概率掉落大红
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <UpgradeCenter
              gameState={gameState}
              coins={gameState.coins}
              getUpgradePrice={getUpgradePrice}
              purchaseUpgrade={purchaseUpgrade}
              upgradeFlash={upgradeFlash}
              upgradeFloatText={upgradeFloatText}
            />

            <section>
              <div className="flex gap-2 border-b border-gray-700/50 mb-4">
                <button
                  onClick={() => setActiveTab('maps')}
                  className={`px-4 py-2 rounded-t-lg font-semibold transition-all ${
                    gameState.activeTab === 'maps'
                      ? 'bg-military-green/50 text-green-300 border-b-2 border-green-500'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🗺️</span> 地图选择
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('collection')}
                  className={`px-4 py-2 rounded-t-lg font-semibold transition-all ${
                    gameState.activeTab === 'collection'
                      ? 'bg-purple-900/50 text-purple-300 border-b-2 border-purple-500'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>📦</span> 收藏馆
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`px-4 py-2 rounded-t-lg font-semibold transition-all ${
                    gameState.activeTab === 'achievements'
                      ? 'bg-yellow-900/50 text-yellow-300 border-b-2 border-yellow-500'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🏆</span> 成就
                  </span>
                </button>
              </div>

              {gameState.activeTab === 'maps' && (
                <div className="space-y-3">
                  {MAPS.map((map) => (
                    <MapCard
                      key={map.id}
                      map={map}
                      isCurrent={gameState.currentMapId === map.id}
                      canAfford={gameState.coins >= map.entranceCost}
                      onEnter={() => enterMap(map.id)}
                    />
                  ))}
                </div>
              )}

              {gameState.activeTab === 'collection' && (
                <div>
                  <div className="mb-4 p-4 bg-purple-900/30 border border-purple-700/50 rounded-lg">
                    <div className="text-center mb-3">
                      <span className="text-purple-200 font-bold text-lg">
                        已收集 {collectedCount}/{totalCollectibles}（{collectionProgress.toFixed(1)}%）｜总被动收入 +{collectionBonus} 哈夫币/秒
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-600 to-green-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${collectionProgress}%` }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {COLLECTIBLES.map((item) => (
                      <CollectionCard
                        key={item.id}
                        item={item}
                        count={gameState.collection[item.id] || 0}
                      />
                    ))}
                  </div>
                </div>
              )}

              {gameState.activeTab === 'achievements' && (
                <AchievementPage
                  achievementProgress={gameState.achievementProgress || {}}
                />
              )}
            </section>
          </div>
        </main>

        <footer className="mt-8 pb-4">
          <Stats
            totalClicks={gameState.totalClicks}
            totalCoinsEarned={gameState.totalCoinsEarned}
          />
          <div className="text-center mt-6 text-gray-600 text-xs">
            <p>🎮 三角洲行动风格放置游戏 | 数据自动保存至本地</p>
          </div>
        </footer>
      </div>
      
      <BankruptcyButton
        onClick={() => setShowBankruptcyDialog(true)}
        isInDebt={isInDebt}
      />
      
      <BankruptcyDialog
        show={showBankruptcyDialog}
        onConfirm={declareBankruptcy}
        onCancel={() => setShowBankruptcyDialog(false)}
        debtAmount={Math.abs(gameState.coins)}
      />
    </div>
  );
}

export default App;
