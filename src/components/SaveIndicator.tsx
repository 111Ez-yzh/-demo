interface SaveIndicatorProps {
  show: boolean;
}

export function SaveIndicator({ show }: SaveIndicatorProps) {
  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-green-900/80 rounded-lg border border-green-700 shadow-lg">
        <span className="text-green-400">💾</span>
        <span className="text-green-300 text-sm font-medium">存档已自动保存</span>
      </div>
    </div>
  );
}
