import { Users, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReferralBannerProps {
  isActive: boolean;
  phoneValue: string;
  onToggle: () => void;
  onPhoneChange: (phone: string) => void;
}

/**
 * Referral Banner Component (Growth Hack Card)
 * - Gold border-2, white background with gradient
 * - Toggle switch reveals phone input
 * - Validation feedback at 10 digits
 * - All state managed by parent via props
 */
export function ReferralBanner({
  isActive,
  phoneValue,
  onToggle,
  onPhoneChange,
}: ReferralBannerProps) {
  const handlePhoneInput = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10);
    onPhoneChange(cleaned);
  };

  return (
    <div className="bg-gradient-to-br from-[#D4AF37]/10 via-white to-[#D4AF37]/5 rounded-2xl border-2 border-[#D4AF37] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#2D2D2D] mb-1">
              Randevuna arkadaşını ekle, anında 100 TL kazan!
            </h3>
            <p className="text-sm text-gray-600">
              Hem sen hem de arkadaşın indirim kazanın
            </p>
          </div>
        </div>

        <button
          onClick={onToggle}
          className={`relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ${
            isActive ? 'bg-[#10B981]' : 'bg-gray-300'
          }`}
          aria-label="Kampanyayı aktif et"
        >
          <motion.div
            className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
            animate={{
              left: isActive ? '30px' : '4px',
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
        </button>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative mt-3">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                placeholder="Arkadaşının Telefon Numarası"
                value={phoneValue}
                onChange={(e) => handlePhoneInput(e.target.value)}
                className="w-full bg-white rounded-2xl pl-11 pr-4 py-3 text-[#2D2D2D] placeholder:text-gray-400 border border-[#D4AF37]/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                maxLength={10}
                aria-label="Telefon numarası"
              />
              {phoneValue.length > 0 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  {phoneValue.length}/10
                </div>
              )}
            </div>
            {phoneValue.length === 10 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[#10B981] mt-2 flex items-center gap-1"
              >
                ✓ 100 TL indirim tüm hizmetlere uygulanacak
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
