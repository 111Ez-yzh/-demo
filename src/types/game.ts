export interface GameMap {
  id: string;
  name: string;
  difficulty: '普通' | '机密' | '绝密';
  entranceCost: number;
  dropRateBonus: number;
  bgColor: string;
  bgGradient: string;
}

export interface Collectible {
  id: string;
  name: string;
  emoji: string;
  description: string;
  coinsPerSecond: number;
  dropWeight: number;
}

export interface GameState {
  coins: number;
  currentMapId: string;
  totalClicks: number;
  totalCoinsEarned: number;
  lastSaveTime: number;
  collection: Record<string, number>;
  activeTab: 'maps' | 'collection' | 'achievements';
  upgrades: {
    clickMultiplier: number;
    dropRateBoost: number;
  };
  achievementProgress: AchievementProgress;
  totalDebtRuns: number;
  totalEscapes: number;
  totalTopSecretRuns: number;
  hasBeenInDebt: boolean;
  skins: {
    goldenMouse: boolean;
    legendaryMouse: boolean;
  };
  title: string | null;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  priceMultiplier: number;
  level: number;
}

export const INITIAL_UPGRADES = {
  clickMultiplier: 0,
  dropRateBoost: 0,
};

export const UPGRADES: Upgrade[] = [
  {
    id: 'click_multiplier',
    name: '极限跑刀训练',
    description: '训练鼠鼠的刀法，让每一次跑刀都更值钱',
    basePrice: 1200,
    priceMultiplier: 1.6,
    level: 0,
  },
  {
    id: 'drop_rate_boost',
    name: '大红感知训练',
    description: '让跑刀鼠鼠对珍贵大红更加敏感，无论进入哪个地图都能更容易发现',
    basePrice: 1500,
    priceMultiplier: 1.6,
    level: 0,
  },
];

export interface DropNotification {
  id: number;
  item: Collectible;
}

export interface CoinParticle {
  id: number;
  x: number;
  y: number;
  value: number;
}

export const MAPS: GameMap[] = [
  {
    id: 'zero_dam_normal',
    name: '零号大坝',
    difficulty: '普通',
    entranceCost: 0,
    dropRateBonus: 0,
    bgColor: '#1a3a1a',
    bgGradient: 'from-green-950 via-green-900 to-green-950',
  },
  {
    id: 'zero_dam_secret',
    name: '零号大坝',
    difficulty: '机密',
    entranceCost: 1000,
    dropRateBonus: 1,
    bgColor: '#2a3a2a',
    bgGradient: 'from-emerald-950 via-green-800 to-emerald-950',
  },
  {
    id: 'longbow_normal',
    name: '长弓溪谷',
    difficulty: '普通',
    entranceCost: 2000,
    dropRateBonus: 2,
    bgColor: '#1a2a3a',
    bgGradient: 'from-blue-950 via-slate-800 to-blue-950',
  },
  {
    id: 'longbow_secret',
    name: '长弓溪谷',
    difficulty: '机密',
    entranceCost: 4000,
    dropRateBonus: 3,
    bgColor: '#2a3a4a',
    bgGradient: 'from-cyan-950 via-blue-800 to-cyan-950',
  },
  {
    id: 'bakesh_secret',
    name: '巴克什',
    difficulty: '机密',
    entranceCost: 8000,
    dropRateBonus: 4,
    bgColor: '#3a2a1a',
    bgGradient: 'from-amber-950 via-stone-800 to-amber-950',
  },
  {
    id: 'bakesh_top_secret',
    name: '巴克什',
    difficulty: '绝密',
    entranceCost: 16000,
    dropRateBonus: 5,
    bgColor: '#4a3a2a',
    bgGradient: 'from-orange-950 via-amber-800 to-orange-950',
  },
  {
    id: 'space_base_top_secret',
    name: '航天基地',
    difficulty: '绝密',
    entranceCost: 32000,
    dropRateBonus: 7,
    bgColor: '#2a1a3a',
    bgGradient: 'from-purple-950 via-slate-800 to-purple-950',
  },
  {
    id: 'tide_prison_top_secret',
    name: '潮汐监狱',
    difficulty: '绝密',
    entranceCost: 64000,
    dropRateBonus: 10,
    bgColor: '#3a1a1a',
    bgGradient: 'from-red-950 via-slate-800 to-red-950',
  },
];

export const COLLECTIBLES: Collectible[] = [
  { id: 'ocean_tear', name: '海洋之泪', emoji: '💧', description: '深海中发现的神秘蓝宝石，散发着幽蓝的光芒。', coinsPerSecond: 100, dropWeight: 1 },
  { id: 'african_heart', name: '非洲之心', emoji: '💎', description: '传说中的稀世珍宝，价值连城的顶级大红。', coinsPerSecond: 55, dropWeight: 1 },
  { id: 'ventilator', name: '复苏呼吸机', emoji: '🩺', description: '军用级生命维持设备，关键时刻能救命。', coinsPerSecond: 42, dropWeight: 2 },
  { id: 'armored_battery', name: '装甲车电池', emoji: '🔋', description: '装甲车专用高能量电池，动力惊人。', coinsPerSecond: 35, dropWeight: 3 },
  { id: 'zongheng', name: '纵横', emoji: '♟️', description: '传说中的神兵利器，纵横沙场。', coinsPerSecond: 32, dropWeight: 3.5 },
  { id: 'golden_crown', name: '万金泪冠', emoji: '👑', description: '用万金打造的珍贵皇冠，价值连城。', coinsPerSecond: 30, dropWeight: 4 },
  { id: 'micro_reactor', name: '微型反应炉', emoji: '⚛️', description: '便携式微型核反应炉，能量无限。', coinsPerSecond: 28, dropWeight: 4.5 },
  { id: 'colorful_ke', name: '炫彩克小圈', emoji: '👸', description: '炫彩夺目的珍贵饰品，闪耀光芒。', coinsPerSecond: 25, dropWeight: 5 },
  { id: 'ecmo', name: 'ECMO', emoji: '🏥', description: '顶级生命支持设备，挽救生命的神器。', coinsPerSecond: 24, dropWeight: 5.5 },
  { id: 'quantum_storage', name: '量子存储', emoji: '💾', description: '量子级存储设备，容量无限。', coinsPerSecond: 22, dropWeight: 6 },
  { id: 'military_radio', name: '军用电台', emoji: '📻', description: '军用级无线电台，通讯范围超远。', coinsPerSecond: 20, dropWeight: 6.5 },
  { id: 'aed', name: '自动体外除颤器', emoji: '⚡', description: '心脏急救神器，关键时刻能救命。', coinsPerSecond: 19, dropWeight: 7 },
  { id: 'flight_recorder', name: '飞行记录仪', emoji: '✈️', description: '飞机黑匣子，记录着珍贵的飞行数据。', coinsPerSecond: 18, dropWeight: 7.5 },
  { id: 'carbon_plate', name: '强化碳纤维板', emoji: '🛡️', description: '轻盈而坚韧的防护材料。', coinsPerSecond: 17, dropWeight: 8 },
  { id: 'military_shell', name: '军用炮弹', emoji: '💣', description: '军用级炮弹，威力巨大。', coinsPerSecond: 16, dropWeight: 8.5 },
  { id: 'laptop', name: '笔记本电脑', emoji: '💻', description: '便携军用笔记本电脑，性能强悍。', coinsPerSecond: 15, dropWeight: 9 },
  { id: 'portable_radar', name: '便携军用雷达', emoji: '📡', description: '小巧的雷达设备，可以探测周围的敌人。', coinsPerSecond: 14, dropWeight: 9.5 },
  { id: 'tank_model', name: '主战坦克模型', emoji: '🎖️', description: '精致的坦克模型，收藏价值极高。', coinsPerSecond: 13, dropWeight: 10 },
  { id: 'secret_server', name: '绝密服务器', emoji: '🔐', description: '存储着高度机密信息的服务器。', coinsPerSecond: 12, dropWeight: 11 },
  { id: 'power_vacuum', name: '强力吸尘器', emoji: '🧹', description: '军用级清洁设备，吸力惊人。', coinsPerSecond: 11, dropWeight: 11.5 },
  { id: 'mandel_supercomputer', name: '曼德尔超算单元', emoji: '🖥️', description: '顶级计算设备，处理速度惊人。', coinsPerSecond: 10, dropWeight: 12.5 },
  { id: 'claudius_bust', name: '克劳狄乌斯半身像', emoji: '🗿', description: '古罗马皇帝克劳狄乌斯的珍贵半身像。', coinsPerSecond: 9, dropWeight: 13.5 },
  { id: 'ifv_model', name: '步战车模型', emoji: '🚗', description: '精致的步兵战车模型。', coinsPerSecond: 9, dropWeight: 14 },
  { id: 'said_pocket_watch', name: '赛伊德的怀表', emoji: '⌚', description: '传奇人物赛伊德的随身怀表，做工精致。', coinsPerSecond: 8, dropWeight: 15 },
  { id: 'robot_vacuum', name: '扫拖一体机器人', emoji: '🤖', description: '军用级扫拖一体机器人，自动清洁。', coinsPerSecond: 8, dropWeight: 16 },
  { id: 'ress_phonograph', name: '雷斯的留声机', emoji: '🎵', description: '传奇人物雷斯的古董留声机。', coinsPerSecond: 7, dropWeight: 17.5 },
  { id: 'luxury_watch', name: '名贵机械表', emoji: '⌛', description: '世界顶级品牌的名贵机械表。', coinsPerSecond: 7, dropWeight: 18.5 },
  { id: 'medical_robot', name: '医疗机械人', emoji: '🏩', description: '军用级医疗机器人，精准治疗。', coinsPerSecond: 6, dropWeight: 20 },
  { id: 'military_terminal', name: '军用控制终端', emoji: '🎮', description: '军用装备控制终端，精密操作。', coinsPerSecond: 6, dropWeight: 21 },
  { id: 'premium_coffee', name: '高级咖啡豆', emoji: '☕', description: '来自埃塞俄比亚的顶级咖啡豆，提神醒脑。', coinsPerSecond: 5, dropWeight: 22.5 },
  { id: 'musket_exhibit', name: '滑膛枪展品', emoji: '🔫', description: '古董滑膛枪展品，历史价值极高。', coinsPerSecond: 5, dropWeight: 24 },
  { id: 'video_camera', name: '摄影机', emoji: '📷', description: '专业级摄影机，记录每一个精彩瞬间。', coinsPerSecond: 5, dropWeight: 25 },
  { id: 'military_info_terminal', name: '军用信息终端', emoji: '📱', description: '军用信息处理终端，快速高效。', coinsPerSecond: 4, dropWeight: 27.5 },
  { id: 'power_battery', name: '动力电池组', emoji: '🔌', description: '军用动力电池组，续航持久。', coinsPerSecond: 4, dropWeight: 29 },
  { id: 'military_drone', name: '军用无人机', emoji: '🛸', description: '军用侦察无人机，视野广阔。', coinsPerSecond: 4, dropWeight: 30 },
  { id: 'high_speed_disk', name: '高速磁盘阵列', emoji: '💿', description: '军用级高速磁盘阵列，读写速度惊人。', coinsPerSecond: 3, dropWeight: 32.5 },
  { id: 'blade_server', name: '刀片服务器', emoji: '⚙️', description: '高性能服务器集群，运算能力强大。', coinsPerSecond: 3, dropWeight: 35 },
  { id: 'golden_gazelle', name: '黄金瞪羚', emoji: '🦌', description: '用纯金打造的瞪羚雕像，栩栩如生。', coinsPerSecond: 3, dropWeight: 37.5 },
  { id: 'spinosaurus_claw', name: '棘龙爪化石', emoji: '🦴', description: '珍贵的棘龙爪化石，科研价值极高。', coinsPerSecond: 2, dropWeight: 40 },
  { id: 'olivia_champagne', name: '奥莉薇娅香槟', emoji: '🍾', description: '法国顶级香槟，奥莉薇娅特别版。', coinsPerSecond: 2, dropWeight: 42.5 },
];

export const INITIAL_STATE: GameState = {
  coins: 0,
  currentMapId: 'zero_dam_normal',
  totalClicks: 0,
  totalCoinsEarned: 0,
  lastSaveTime: Date.now(),
  collection: {},
  activeTab: 'maps',
  upgrades: INITIAL_UPGRADES,
  achievementProgress: {},
  totalDebtRuns: 0,
  totalEscapes: 0,
  totalTopSecretRuns: 0,
  hasBeenInDebt: false,
  skins: {
    goldenMouse: false,
    legendaryMouse: false,
  },
  title: null,
};

export const STORAGE_KEY = 'shushudelta_save';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  target: number;
  reward: {
    coins?: number;
    dropRateBoost?: number;
    clickMultiplierBoost?: number;
    skin?: string;
    title?: string;
  };
  type: 'runs' | 'escapes' | 'debtRuns' | 'topSecretRuns' | 'collections' | 'totalCoins' | 'upgrades' | 'perfectCollection' | 'allAchievements';
  isHidden?: boolean;
}

export interface AchievementProgress {
  [achievementId: string]: {
    progress: number;
    unlocked: boolean;
    claimed: boolean;
  };
}

export type CollectibleTier = 'T0' | 'T1' | 'T2' | 'T3';

export function getCollectibleTier(coinsPerSecond: number): CollectibleTier {
  if (coinsPerSecond >= 50) return 'T0';
  if (coinsPerSecond >= 25) return 'T1';
  if (coinsPerSecond >= 10) return 'T2';
  return 'T3';
}

export const TIER_CONFIG: Record<CollectibleTier, { 
  borderColor: string; 
  glowColor: string; 
  titleColor: string;
  boxShadow: string;
}> = {
  T0: {
    borderColor: 'border-yellow-500',
    glowColor: 'from-yellow-600/30 to-yellow-800/30',
    titleColor: 'text-yellow-400',
    boxShadow: 'shadow-[0_0_20px_rgba(234,179,8,0.5)]'
  },
  T1: {
    borderColor: 'border-purple-500',
    glowColor: 'from-purple-600/30 to-purple-800/30',
    titleColor: 'text-purple-400',
    boxShadow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]'
  },
  T2: {
    borderColor: 'border-blue-500',
    glowColor: 'from-blue-600/30 to-blue-800/30',
    titleColor: 'text-blue-400',
    boxShadow: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]'
  },
  T3: {
    borderColor: 'border-green-500',
    glowColor: 'from-green-600/30 to-green-800/30',
    titleColor: 'text-green-400',
    boxShadow: 'shadow-[0_0_10px_rgba(34,197,94,0.5)]'
  }
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'mouse_recruit',
    name: '鼠鼠新兵',
    description: '跑刀10次',
    target: 10,
    reward: { coins: 300 },
    type: 'runs'
  },
  {
    id: 'running_veteran',
    name: '跑刀老手',
    description: '跑刀100次',
    target: 100,
    reward: { coins: 1500, dropRateBoost: 1 },
    type: 'runs'
  },
  {
    id: 'escape_expert',
    name: '逃生专家',
    description: '逃跑10次',
    target: 10,
    reward: { coins: 800 },
    type: 'escapes'
  },
  {
    id: 'debt_hero',
    name: '负债英雄',
    description: '负债状态下跑刀20次',
    target: 20,
    reward: { coins: 2000 },
    type: 'debtRuns'
  },
  {
    id: 'top_secret_maniac',
    name: '绝密狂徒',
    description: '在绝密地图跑刀50次',
    target: 50,
    reward: { dropRateBoost: 3 },
    type: 'topSecretRuns'
  },
  {
    id: 'collectible_newbie',
    name: '大红新手',
    description: '收集5件大红',
    target: 5,
    reward: { coins: 500 },
    type: 'collections'
  },
  {
    id: 'collectible_hunter',
    name: '大红猎人',
    description: '收集20件大红',
    target: 20,
    reward: { coins: 3000 },
    type: 'collections'
  },
  {
    id: 'collection_master',
    name: '图鉴达人',
    description: '收集40件大红',
    target: 40,
    reward: { dropRateBoost: 5 },
    type: 'collections'
  },
  {
    id: 'millionaire',
    name: '百万富翁',
    description: '累计获得1,000,000哈夫币',
    target: 1000000,
    reward: { coins: 5000, skin: 'goldenMouse' },
    type: 'totalCoins'
  },
  {
    id: 'upgrade_maniac',
    name: '升级狂魔',
    description: '升级中心总等级达到30级',
    target: 30,
    reward: { clickMultiplierBoost: 2 },
    type: 'upgrades'
  },
  {
    id: 'perfect_escape',
    name: '完美撤离',
    description: '从未负债就收集10件大红',
    target: 10,
    reward: { coins: 10000 },
    type: 'perfectCollection',
    isHidden: true
  },
  {
    id: 'mouse_legend',
    name: '鼠鼠传奇',
    description: '完成以上全部11个成就',
    target: 11,
    reward: { skin: 'legendaryMouse', title: '传奇跑刀鼠' },
    type: 'allAchievements'
  }
];
