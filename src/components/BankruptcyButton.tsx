interface BankruptcyButtonProps {
  onClick: () => void;
  isInDebt: boolean;
}

export function BankruptcyButton({ onClick, isInDebt }: BankruptcyButtonProps) {
  if (!isInDebt) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={onClick}
        className="relative overflow-hidden px-6 py-4 text-xl font-bold rounded-2xl bg-gradient-to-r from-orange-700 via-red-700 to-orange-700 hover:from-orange-600 hover:via-red-600 hover:to-orange-600 text-white shadow-xl shadow-red-900/50 transform transition-all duration-150 active:scale-95 border-2 border-red-400/30 hover:scale-105"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">💸</span>
          <span className="drop-shadow-lg">破产！</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 pointer-events-none" />
      </button>
    </div>
  );
}
