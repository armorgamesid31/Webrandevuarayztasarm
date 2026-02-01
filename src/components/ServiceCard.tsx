import { useState } from 'react';
import { ChevronDown, User, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceCardProps {
  id: string;
  name: string;
  price: number;
  duration: string;
  description?: string;
  isSelected: boolean;
  forGuest?: boolean;
  onAdd: () => void;
  onGuestToggle?: () => void;
}

/**
 * Service Card Component
 * - Accordion style with header and expandable content
 * - Shows service name, price, duration, and Add button
 * - Expanded state reveals description and "Who is this for?" selector
 * - Visual change when "Misafir" mode is active
 */
export function ServiceCard({
  id,
  name,
  price,
  duration,
  description,
  isSelected,
  forGuest = false,
  onAdd,
  onGuestToggle,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl border transition-all shadow-sm ${
        forGuest
          ? 'border-[#D4AF37] bg-[#D4AF37]/5'
          : isSelected
          ? 'border-[#D4AF37]'
          : 'border-gray-100'
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between gap-3 text-left"
        aria-label={`${name} detaylarını göster`}
      >
        <div className="flex-1">
          <h3 className="font-semibold text-[#2D2D2D] mb-1">{name}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{duration}</span>
            <span className="font-semibold text-[#D4AF37]">{price} TL</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
              isSelected
                ? 'bg-[#10B981] text-white'
                : 'bg-[#D4AF37] text-white hover:bg-[#B8941F]'
            }`}
            aria-label={isSelected ? 'Hizmeti kaldır' : 'Hizmet ekle'}
          >
            {isSelected ? 'Eklendi' : 'Ekle'}
          </button>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-gray-100">
              {/* Description */}
              {description && (
                <p className="text-sm text-gray-600 mb-4">{description}</p>
              )}

              {/* Who is this for? Selector */}
              {isSelected && onGuestToggle && (
                <div>
                  <p className="text-sm font-medium text-[#2D2D2D] mb-2">
                    Bu hizmet kimin için?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (forGuest) onGuestToggle();
                      }}
                      className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        !forGuest
                          ? 'bg-[#D4AF37] text-white'
                          : 'bg-white border border-gray-200 text-[#2D2D2D] hover:border-[#D4AF37]'
                      }`}
                      aria-label="Kendim için"
                    >
                      <User className="w-4 h-4" />
                      <span>Bana</span>
                    </button>
                    <button
                      onClick={() => {
                        if (!forGuest) onGuestToggle();
                      }}
                      className={`flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        forGuest
                          ? 'bg-[#D4AF37] text-white'
                          : 'bg-white border border-gray-200 text-[#2D2D2D] hover:border-[#D4AF37]'
                      }`}
                      aria-label="Misafir için"
                    >
                      <Gift className="w-4 h-4" />
                      <span>Misafir</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
