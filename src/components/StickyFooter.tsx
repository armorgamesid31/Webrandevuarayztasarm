import { motion } from 'motion/react';
import { ChevronUp } from 'lucide-react';

interface StickyFooterProps {
  originalPrice: number;
  finalPrice: number;
  hasDiscount: boolean;
  isEnabled: boolean;
  onConfirm: () => void;
  onShowBreakdown: () => void;
}

export function StickyFooter({
  originalPrice,
  finalPrice,
  hasDiscount,
  isEnabled,
  onConfirm,
  onShowBreakdown,
}: StickyFooterProps) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
    >
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Price Section */}
        <button
          onClick={onShowBreakdown}
          className="flex flex-col items-start hover:opacity-80 transition-opacity"
        >
          {hasDiscount && originalPrice !== finalPrice && (
            <p className="text-sm text-gray-400 line-through">
              {originalPrice} TL
            </p>
          )}
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-[#2D2D2D]">
              {finalPrice} TL
            </p>
            <ChevronUp className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Detayı gör
          </p>
        </button>

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          disabled={!isEnabled}
          className={`flex-1 py-4 px-6 rounded-[20px] font-semibold text-white transition-all ${
            isEnabled
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:shadow-lg active:scale-95'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Randevuyu Onayla
        </button>
      </div>
    </motion.div>
  );
}
