import { motion, AnimatePresence } from 'motion/react';

interface WelcomeModalProps {
  isOpen: boolean;
  onSelectGender: (gender: 'woman' | 'man') => void;
}

/**
 * Welcome Modal Component
 * - Glassmorphism backdrop
 * - Two gender selection cards (Woman: Gold gradient, Man: Dark)
 * - Props-driven visibility
 */
export function WelcomeModal({ isOpen, onSelectGender }: WelcomeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]" />

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✨</span>
                </div>
                <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-2">
                  Hoş Geldiniz!
                </h2>
                <p className="text-gray-600">
                  Size özel fiyatlandırma ve hizmetleri görmek için lütfen bir
                  kategori seçin:
                </p>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectGender('woman')}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                      👩
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xl font-semibold">Kadın Menüsü</p>
                      <p className="text-sm text-white/90 mt-1">
                        Güzellik ve bakım hizmetleri
                      </p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectGender('man')}
                  className="w-full bg-[#2D2D2D] text-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-3xl">
                      👨
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xl font-semibold">Erkek Menüsü</p>
                      <p className="text-sm text-white/80 mt-1">
                        Özel erkek bakım hizmetleri
                      </p>
                    </div>
                  </div>
                </motion.button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-6">
                Seçiminizi istediğiniz zaman değiştirebilirsiniz
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
