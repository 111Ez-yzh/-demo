import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GameState,
  MAPS,
  INITIAL_STATE,
  STORAGE_KEY,
  CoinParticle,
  COLLECTIBLES,
  Collectible,
  DropNotification,
  ACHIEVEMENTS,
  Achievement,
} from '../types/game';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GameState;
        return {
          ...INITIAL_STATE,
          ...parsed,
        };
      } catch {
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  });

  const [particles, setParticles] = useState<CoinParticle[]>([]);
  const [dropNotifications, setDropNotifications] = useState<DropNotification[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const [showMapEnterNotification, setShowMapEnterNotification] = useState<{ show: boolean; mapName: string; dropRate: number }>({ show: false, mapName: '', dropRate: 0 });
  const [upgradeFlash, setUpgradeFlash] = useState<string | null>(null);
  const [upgradeFloatText, setUpgradeFloatText] = useState<string | null>(null);
  const [isNegative, setIsNegative] = useState(false);
  const [lastResult, setLastResult] = useState<{ value: number; isNegative: boolean } | null>(null);
  const [showBankruptcyDialog, setShowBankruptcyDialog] = useState(false);
  const [achievementNotifications, setAchievementNotifications] = useState<{ id: number; achievement: Achievement }[]>([]);
  const particleIdRef = useRef(0);
  const notificationIdRef = useRef(0);
  const achievementNotificationIdRef = useRef(0);

  const currentMap = MAPS.find((m) => m.id === gameState.currentMapId) || MAPS[0];

  const calculateCollectionBonus = useCallback(() => {
    let bonus = 0;
    for (const [itemId, count] of Object.entries(gameState.collection)) {
      if (count > 0) {
        const item = COLLECTIBLES.find(c => c.id === itemId);
        if (item) {
          bonus += item.coinsPerSecond;
        }
      }
    }
    return bonus;
  }, [gameState.collection]);

  const collectionBonus = calculateCollectionBonus();
  const totalCoinsPerSecond = collectionBonus;

  const calculateClickMultiplier = useCallback(() => {
    return 1 + (gameState.upgrades.clickMultiplier * 0.35);
  }, [gameState.upgrades.clickMultiplier]);

  const clickMultiplier = calculateClickMultiplier();

  const currentDropRate = 1 + currentMap.dropRateBonus + gameState.upgrades.dropRateBoost;

  const getRiskConfig = useCallback(() => {
    const negativeReduction = gameState.upgrades.clickMultiplier * 1;
    
    if (['zero_dam_normal', 'longbow_normal'].includes(currentMap.id)) {
      return {
        negativeChance: Math.max(0, 10 - negativeReduction),
        minNegative: -2,
        maxNegative: -1,
        minPositive: 8,
        maxPositive: 12,
      };
    } else if (currentMap.id === 'zero_dam_secret') {
      return {
        negativeChance: Math.max(0, 10 - negativeReduction),
        minNegative: -3,
        maxNegative: -2,
        minPositive: 10,
        maxPositive: 15,
      };
    } else if (['longbow_secret'].includes(currentMap.id)) {
      return {
        negativeChance: Math.max(0, 35 - negativeReduction),
        minNegative: -100,
        maxNegative: -15,
        minPositive: 12,
        maxPositive: 35,
      };
    } else if (['space_base_top_secret', 'tide_prison_top_secret'].includes(currentMap.id)) {
      return {
        negativeChance: Math.max(0, 55 - negativeReduction),
        minNegative: -600,
        maxNegative: -200,
        minPositive: 20,
        maxPositive: 80,
      };
    } else {
      return {
        negativeChance: Math.max(0, 35 - negativeReduction),
        minNegative: -50,
        maxNegative: -15,
        minPositive: 12,
        maxPositive: 35,
      };
    }
  }, [currentMap.id, gameState.upgrades.clickMultiplier]);

  const getUpgradePrice = useCallback((upgradeId: string): number => {
    const basePrice = upgradeId === 'click_multiplier' ? 1200 : 1500;
    const level = upgradeId === 'click_multiplier' 
      ? gameState.upgrades.clickMultiplier 
      : gameState.upgrades.dropRateBoost;
    return Math.floor(basePrice * Math.pow(1.6, level));
  }, [gameState.upgrades]);

  const purchaseUpgrade = useCallback((upgradeId: string) => {
    const price = getUpgradePrice(upgradeId);
    if (gameState.coins >= price) {
      setGameState((prev) => ({
        ...prev,
        coins: prev.coins - price,
        upgrades: {
          ...prev.upgrades,
          [upgradeId === 'click_multiplier' ? 'clickMultiplier' : 'dropRateBoost']: 
            prev.upgrades[upgradeId === 'click_multiplier' ? 'clickMultiplier' : 'dropRateBoost'] + 1,
        },
      }));
      setUpgradeFlash(upgradeId);
      if (upgradeId === 'drop_rate_boost') {
        setUpgradeFloatText('+1% 掉率');
      }
      setTimeout(() => setUpgradeFlash(null), 500);
      setTimeout(() => setUpgradeFloatText(null), 1500);
      return true;
    }
    return false;
  }, [gameState.coins, getUpgradePrice]);

  const getRandomCollectible = useCallback((): Collectible | null => {
    if (Math.random() > (currentDropRate / 100)) return null;

    const totalWeight = COLLECTIBLES.reduce((sum, item) => sum + item.dropWeight, 0);
    let random = Math.random() * totalWeight;
    
    for (const item of COLLECTIBLES) {
      random -= item.dropWeight;
      if (random <= 0) {
        return item;
      }
    }
    
    return COLLECTIBLES[COLLECTIBLES.length - 1];
  }, [currentDropRate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        coins: prev.coins + totalCoinsPerSecond,
        totalCoinsEarned: prev.totalCoinsEarned + totalCoinsPerSecond,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [totalCoinsPerSecond]);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...gameState,
          lastSaveTime: Date.now(),
        })
      );
      setShowSaveIndicator(true);
      setTimeout(() => setShowSaveIndicator(false), 2000);
    }, 5000);

    return () => clearInterval(saveInterval);
  }, [gameState]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...gameState,
          lastSaveTime: Date.now(),
        })
      );
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [gameState]);

  const checkAchievements = useCallback(() => {
    setGameState((prev) => {
      const newState = { ...prev };
      let achievementsUpdated = false;

      // 初始化成就进度
      if (!newState.achievementProgress) {
        newState.achievementProgress = {};
      }

      // 计算当前各种进度
      const collectedCount = Object.keys(newState.collection).filter(k => newState.collection[k] > 0).length;
      const totalUpgrades = newState.upgrades.clickMultiplier + newState.upgrades.dropRateBoost;
      const unlockedAchievements = Object.values(newState.achievementProgress).filter(a => a.unlocked).length;

      // 检查每个成就
      for (const achievement of ACHIEVEMENTS) {
        const progress = newState.achievementProgress[achievement.id] || { progress: 0, unlocked: false, claimed: false };
        if (progress.unlocked) continue;

        let currentProgress = 0;
        switch (achievement.type) {
          case 'runs':
            currentProgress = newState.totalClicks;
            break;
          case 'escapes':
            currentProgress = newState.totalEscapes;
            break;
          case 'debtRuns':
            currentProgress = newState.totalDebtRuns;
            break;
          case 'topSecretRuns':
            currentProgress = newState.totalTopSecretRuns;
            break;
          case 'collections':
            currentProgress = collectedCount;
            break;
          case 'totalCoins':
            currentProgress = newState.totalCoinsEarned;
            break;
          case 'upgrades':
            currentProgress = totalUpgrades;
            break;
          case 'perfectCollection':
            if (!newState.hasBeenInDebt) {
              currentProgress = collectedCount;
            }
            break;
          case 'allAchievements':
            currentProgress = unlockedAchievements;
            break;
        }

        // 更新进度
        if (currentProgress !== progress.progress) {
          newState.achievementProgress[achievement.id] = {
            ...progress,
            progress: Math.min(currentProgress, achievement.target)
          };
          achievementsUpdated = true;
        }

        // 检查是否解锁
        if (currentProgress >= achievement.target && !progress.unlocked) {
          newState.achievementProgress[achievement.id] = {
            ...progress,
            progress: achievement.target,
            unlocked: true,
            claimed: true
          };

          // 发放奖励
          if (achievement.reward.coins) {
            newState.coins += achievement.reward.coins;
          }
          if (achievement.reward.skin) {
            if (achievement.reward.skin === 'goldenMouse') {
              newState.skins.goldenMouse = true;
            } else if (achievement.reward.skin === 'legendaryMouse') {
              newState.skins.legendaryMouse = true;
            }
          }
          if (achievement.reward.title) {
            newState.title = achievement.reward.title;
          }

          // 触发成就通知
          setAchievementNotifications(prevNotifications => [
            ...prevNotifications,
            { id: achievementNotificationIdRef.current++, achievement }
          ]);

          achievementsUpdated = true;
        }
      }

      return achievementsUpdated ? newState : prev;
    });
  }, []);

  const handleClick = useCallback((x: number, y: number) => {
    const riskConfig = getRiskConfig();
    const isNegativeResult = Math.random() * 100 < riskConfig.negativeChance;
    
    let earned: number;
    if (isNegativeResult) {
      earned = Math.floor(Math.random() * (riskConfig.maxNegative - riskConfig.minNegative + 1)) + riskConfig.minNegative;
    } else {
      const baseEarned = Math.floor(Math.random() * (riskConfig.maxPositive - riskConfig.minPositive + 1)) + riskConfig.minPositive;
      earned = Math.floor(baseEarned * clickMultiplier);
    }

    const isNegativeOutcome = earned < 0;
    setLastResult({ value: Math.abs(earned), isNegative: isNegativeOutcome });
    setIsNegative(isNegativeOutcome);
    if (isNegativeOutcome) {
      setTimeout(() => setIsNegative(false), 1000);
    }
    
    const particlesToCreate = isNegativeOutcome ? [] : [
      { id: particleIdRef.current++, x: x - 30, y: y, value: earned },
      { id: particleIdRef.current++, x: x + 30, y: y - 10, value: earned },
      { id: particleIdRef.current++, x: x, y: y - 20, value: earned },
    ];

    const droppedItem = getRandomCollectible();

    setParticles((prev) => [...prev, ...particlesToCreate]);
    setGameState((prev) => {
      const newState: GameState = {
        ...prev,
        coins: prev.coins + earned,
        totalClicks: prev.totalClicks + 1,
        totalCoinsEarned: isNegativeOutcome ? prev.totalCoinsEarned : prev.totalCoinsEarned + earned,
        hasBeenInDebt: prev.hasBeenInDebt || (prev.coins + earned < 0),
      };

      // 检查是否在负债状态下跑刀
      if (prev.coins < 0) {
        newState.totalDebtRuns += 1;
      }

      // 检查是否在绝密地图跑刀
      if (currentMap.difficulty === '绝密') {
        newState.totalTopSecretRuns += 1;
      }

      if (droppedItem) {
        if (newState.collection[droppedItem.id] && newState.collection[droppedItem.id] > 0) {
          newState.coins += 100;
          newState.totalCoinsEarned += 100;
        }
        newState.collection = {
          ...newState.collection,
          [droppedItem.id]: (newState.collection[droppedItem.id] || 0) + 1,
        };
      }

      return newState;
    });

    if (droppedItem) {
      const notification: DropNotification = {
        id: notificationIdRef.current++,
        item: droppedItem,
      };
      setDropNotifications((prev) => [...prev, notification]);
      setTimeout(() => {
        setDropNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      }, 3000);
    }

    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 700);

    if (!isNegativeOutcome) {
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !particlesToCreate.some(np => np.id === p.id)));
      }, 1200);
    }

    // 检查成就
    setTimeout(checkAchievements, 100);
  }, [clickMultiplier, getRandomCollectible, getRiskConfig, currentMap.difficulty, checkAchievements]);

  const enterMap = useCallback(
    (mapId: string) => {
      const map = MAPS.find((m) => m.id === mapId);
      if (!map) return false;

      if (gameState.coins >= map.entranceCost) {
        setGameState((prev) => ({
          ...prev,
          coins: prev.coins - map.entranceCost,
          currentMapId: mapId,
        }));
        setShowMapEnterNotification({
          show: true,
          mapName: map.name,
          dropRate: 1 + map.dropRateBonus + gameState.upgrades.dropRateBoost,
        });
        setTimeout(() => setShowMapEnterNotification({ show: false, mapName: '', dropRate: 0 }), 3000);
        return true;
      }
      return false;
    },
    [gameState.coins, gameState.upgrades.dropRateBoost]
  );

  const setActiveTab = useCallback((tab: 'maps' | 'collection' | 'achievements') => {
    setGameState((prev) => ({
      ...prev,
      activeTab: tab,
    }));
  }, []);

  const declareBankruptcy = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      coins: 0,
      currentMapId: 'zero_dam_normal',
    }));
    setShowBankruptcyDialog(false);
  }, []);

  const addEscape = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      totalEscapes: prev.totalEscapes + 1
    }));
  }, []);



  return {
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
    checkAchievements,
    addEscape,
  };
}
