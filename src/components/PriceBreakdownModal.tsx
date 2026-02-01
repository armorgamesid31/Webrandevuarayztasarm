import { motion, AnimatePresence } from 'motion/react';
import { X, Receipt, User, UserPlus, Gift } from 'lucide-react';
import type { Service } from '../App';

interface PriceBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  referralDiscount: number;
  subtotal: number;
  finalPrice: number;
}

export function PriceBreakdownModal({
  isOpen,
  onClose,
  services,
  referralDiscount,
  subtotal,
  finalPrice,
}: PriceBreakdownModalProps) {
  const myServices = services.filter(s => !s.forGuest);
  const guestServices = services.filter(s => s.forGuest);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[30px] z-50 max-h-[75vh] overflow-y-auto"
          >
            <div className="max-w-md mx-auto">
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-[#D4AF37]" />
                  <h2 className="text-xl font-semibold text-[#2D2D2D]">
                    Fiyat Detayı
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-6">
                {/* My Services */}
                {myServices.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-gray-500" />
                      <h3 className="font-semibold text-[#2D2D2D]">Sizin İçin</h3>
                    </div>
                    <div className="space-y-2">
                      {myServices.map((service, index) => (
                        <div
                          key={`${service.id}-me-${index}`}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-[#2D2D2D]">{service.name}</p>
                              {service.usePackage && (
                                <span className="text-xs bg-[#10B981] text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                                  Paket
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{service.duration}</p>
                          </div>
                          <div className="text-right">
                            {service.usePackage ? (
                              <p className="font-semibold text-[#10B981]">Ücretsiz</p>
                            ) : service.discountedPrice && service.discountedPrice !== service.price ? (
                              <div>
                                <p className="text-sm text-gray-400 line-through">
                                  {service.price} TL
                                </p>
                                <p className="font-semibold text-[#10B981]">
                                  {service.discountedPrice} TL
                                </p>
                              </div>
                            ) : (
                              <p className="font-semibold text-[#2D2D2D]">
                                {service.price} TL
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guest Services */}
                {guestServices.length > 0 && (
                  <div className="bg-yellow-50 rounded-[15px] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <UserPlus className="w-4 h-4 text-[#D4AF37]" />
                      <h3 className="font-semibold text-[#2D2D2D]">Misafir İçin</h3>
                    </div>
                    <div className="space-y-2">
                      {guestServices.map((service, index) => (
                        <div
                          key={`${service.id}-guest-${index}`}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex-1">
                            <p className="text-[#2D2D2D]">{service.name}</p>
                            <p className="text-sm text-gray-500">{service.duration}</p>
                          </div>
                          <div className="text-right">
                            {service.discountedPrice && service.discountedPrice !== service.price ? (
                              <div>
                                <p className="text-sm text-gray-400 line-through">
                                  {service.price} TL
                                </p>
                                <p className="font-semibold text-[#10B981]">
                                  {service.discountedPrice} TL
                                </p>
                              </div>
                            ) : (
                              <p className="font-semibold text-[#2D2D2D]">
                                {service.price} TL
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-gray-200" />

                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">Ara Toplam</p>
                  <p className="font-semibold text-[#2D2D2D]">{subtotal} TL</p>
                </div>

                {/* Referral Discount */}
                {referralDiscount > 0 && (
                  <div className="bg-[#10B981]/10 rounded-[15px] p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-[#10B981]" />
                      <p className="font-medium text-[#10B981]">Arkadaş İndirimi</p>
                    </div>
                    <p className="font-semibold text-[#10B981]">-{referralDiscount} TL</p>
                  </div>
                )}

                {/* Total */}
                <div className="bg-[#D4AF37]/10 rounded-[20px] p-4 flex items-center justify-between">
                  <p className="text-lg font-semibold text-[#2D2D2D]">Toplam</p>
                  <p className="text-2xl font-bold text-[#D4AF37]">{finalPrice} TL</p>
                </div>

                {/* Benefits Summary */}
                {(services.some(s => s.discountedPrice) || referralDiscount > 0) && (
                  <div className="bg-[#10B981]/5 border border-[#10B981]/20 rounded-[15px] p-3">
                    <p className="text-sm text-[#10B981] text-center">
                      🎉 Toplam <span className="font-semibold">{subtotal - finalPrice + (services.reduce((sum, s) => sum + ((s.price - (s.discountedPrice || s.price))), 0))} TL</span> tasarruf ediyorsunuz!
                    </p>
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-[20px] px-6 py-4 font-semibold hover:shadow-lg active:scale-95 transition-all"
                >
                  Anladım
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}