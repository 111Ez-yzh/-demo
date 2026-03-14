interface BankruptcyDialogProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  debtAmount: number;
}

export function BankruptcyDialog({ show, onConfirm, onCancel, debtAmount }: BankruptcyDialogProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-900 border-2 border-red-600 rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">💸</div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">破产确认</h2>
        </div>

        <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 mb-6">
          <div className="text-gray-300 text-sm mb-2">当前负债：</div>
          <div className="text-red-400 text-3xl font-bold text-center">
            {debtAmount} 哈夫币
          </div>
        </div>

        <div className="text-gray-400 text-sm mb-6 space-y-2">
          <p className="flex items-start gap-2">
          <span className="text-yellow-400">⚠️</span>
          <span>破产后将：</span>
        </p>
        <ul className="ml-6 list-disc text-gray-300 space-y-1">
          <li>所有哈夫币将重置为 0</li>
          <li>自动返回零号大坝普通地图</li>
          <li>已收集的大红保留不变</li>
          <li>升级等级保留不变</li>
        </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white rounded-xl font-semibold transition-colors"
          >
            确认破产
          </button>
        </div>
      </div>
    </div>
  );
}
