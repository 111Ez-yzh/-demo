import { useEffect, useState } from 'react';

interface CoinDisplayProps {
  coins: number;
  totalCoinsPerSecond: number;
  collectionBonus?: number;
  isNegative?: boolean;
}

export function CoinDisplay({ coins, totalCoinsPerSecond, collectionBonus = 0, isNegative = false }: CoinDisplayProps) {
  const [displayCoins, setDisplayCoins] = useState(coins);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (displayCoins !== coins) {
      setAnimating(true);
      const diff = coins - displayCoins;
      const step = Math.ceil(Math.abs(diff) / 20);
      const direction = diff > 0 ? 1 : -1;
      
      const interval = setInterval(() => {
        setDisplayCoins((prev) => {
          const next = prev + step * direction;
          if ((direction > 0 && next >= coins) || (direction < 0 && next <= coins)) {
            clearInterval(interval);
            return coins;
          }
          return next;
        });
      }, 30);

      setTimeout(() => setAnimating(false), 500);
      return () => clearInterval(interval);
    }
  }, [coins, displayCoins]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const isInDebt = coins < 0;

  return (
    <div className="flex flex-col items-center gap-1">
      {isInDebt && (
        <div className="text-red-500 font-bold text-lg animate-pulse">
          ⚠️ 负债中！快刷低难度回血
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="text-4xl md:text-5xl">💰</span>
        <span
          className={`text-3xl md:text-4xl font-bold transition-all duration-200 ${
            isNegative ? 'animate-pulse text-red-500' : 
            isInDebt ? 'text-red-400' : 
            animating ? 'scale-110 text-yellow-300' : 'text-yellow-400'
          }`}
        >
          {formatNumber(displayCoins)}
        </span>
        <span className={`text-xl ${isInDebt ? 'text-red-600' : 'text-yellow-600'}`}>
          哈夫币
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-1 text-green-400">
          <span className="text-lg">⚡</span>
          <span className="text-lg font-semibold">当前产出 {totalCoinsPerSecond}</span>
          <span className="text-sm text-green-600">哈夫币/秒</span>
        </div>
        {collectionBonus > 0 && (
          <div className="flex items-center gap-1 text-purple-400">
            <span className="text-lg">📦</span>
            <span className="text-lg font-semibold">+{collectionBonus}</span>
            <span className="text-sm text-purple-600">收藏加成</span>
          </div>
        )}
      </div>
    </div>
  );
}
