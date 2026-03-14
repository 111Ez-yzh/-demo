import { useState } from 'react';
import { Collectible, getCollectibleTier, TIER_CONFIG } from '../types/game';

interface CollectionCardProps {
  item: Collectible;
  count: number;
}

export function CollectionCard({ item, count }: CollectionCardProps) {
  const [showDescription, setShowDescription] = useState(false);
  const isUnlocked = count > 0;
  const tier = getCollectibleTier(item.coinsPerSecond);
  const tierConfig = TIER_CONFIG[tier];

  return (
    <div className="relative">
      <div
        className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
          isUnlocked
            ? `${tierConfig.borderColor} bg-gradient-to-br ${tierConfig.glowColor} hover:scale-105 ${tierConfig.boxShadow}`
            : 'border-gray-700 bg-gray-900/40 opacity-60'
        }`}
        onClick={() => isUnlocked && setShowDescription(!showDescription)}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30" />

        <div className="flex flex-col items-center gap-3">
          <div
            className={`text-5xl transition-transform duration-300 ${
              isUnlocked ? 'hover:scale-110' : 'grayscale'
            }`}
          >
            {item.emoji}
          </div>

          <div className="text-center">
            <h3
              className={`font-bold text-base ${
                isUnlocked ? tierConfig.titleColor : 'text-gray-500'
              }`}
            >
              {item.name}
            </h3>
            <p
              className={`text-sm mt-1 ${
                isUnlocked ? tierConfig.titleColor : 'text-gray-600'
              }`}
            >
              +{item.coinsPerSecond} /秒
            </p>
            {count > 1 && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-orange-600/80 text-white text-xs rounded-full">
                ×{count}
              </span>
            )}
          </div>

          {!isUnlocked && (
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <span>🔒</span>
              <span>待发现</span>
            </div>
          )}

          {isUnlocked && (
            <div className={`flex items-center gap-1 text-xs ${tierConfig.titleColor}`}>
              <span>✓</span>
              <span>已拥有</span>
            </div>
          )}
        </div>
      </div>

      {showDescription && isUnlocked && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full z-10 w-64 p-4 bg-gray-900/95 border border-gray-600 rounded-xl shadow-2xl">
          <div className="text-gray-300 text-sm leading-relaxed">
            {item.description}
          </div>
          <div className="mt-2 text-right">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDescription(false);
              }}
              className="text-gray-500 text-xs hover:text-gray-300"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
