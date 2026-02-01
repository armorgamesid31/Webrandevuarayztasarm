import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Calendar, User, Cake } from 'lucide-react';
import type { Booking } from '../App';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
}

export function BookingModal({ isOpen, onClose, booking }: BookingModalProps) {
  const [gender, setGender] = useState<'female' | 'male' | null>(null);
  const [birthDate, setBirthDate] = useState('');
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleSubmit = () => {
    // Mock submission
    console.log('Booking submitted:', {
      ...booking,
      gender,
      birthDate,
      acceptMarketing,
    });
    onClose();
  };

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
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[30px] z-50 max-h-[85vh] overflow-y-auto"
          >
            <div className="max-w-md mx-auto">
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#2D2D2D]">
                  Randevu Bilgileri
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-6">
                {/* Booking Summary */}
                <div className="bg-[#D4AF37]/5 rounded-[20px] p-4 border border-[#D4AF37]/20">
                  <div className="flex items-start gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Hizmet</p>
                      <p className="font-semibold text-[#2D2D2D]">{booking.service?.name}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="text-gray-600">Tarih</p>
                      <p className="font-medium text-[#2D2D2D]">
                        {booking.date ? new Date(booking.date).toLocaleDateString('tr-TR') : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Saat</p>
                      <p className="font-medium text-[#2D2D2D]">{booking.time || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Pre-filled (Locked) Fields */}
                <div className="space-y-3">
                  <label className="block">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Ad Soyad</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value="Ayşe Yılmaz"
                        disabled
                        className="w-full bg-gray-100 rounded-[15px] px-4 py-3 pr-10 text-[#2D2D2D] cursor-not-allowed"
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </label>

                  <label className="block">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-600">Telefon</span>
                    </div>
                    <div className="relative">
                      <input
                        type="tel"
                        value="0555 123 45 67"
                        disabled
                        className="w-full bg-gray-100 rounded-[15px] px-4 py-3 pr-10 text-[#2D2D2D] cursor-not-allowed"
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </label>
                </div>

                {/* Editable Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Cinsiyet *
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setGender('female')}
                        className={`flex-1 py-3 px-4 rounded-[15px] font-medium transition-all ${
                          gender === 'female'
                            ? 'bg-[#D4AF37] text-white shadow-md'
                            : 'bg-gray-100 text-[#2D2D2D] hover:bg-gray-200'
                        }`}
                      >
                        Kadın
                      </button>
                      <button
                        onClick={() => setGender('male')}
                        className={`flex-1 py-3 px-4 rounded-[15px] font-medium transition-all ${
                          gender === 'male'
                            ? 'bg-[#D4AF37] text-white shadow-md'
                            : 'bg-gray-100 text-[#2D2D2D] hover:bg-gray-200'
                        }`}
                      >
                        Erkek
                      </button>
                    </div>
                  </div>

                  <label className="block">
                    <div className="flex items-center gap-2 mb-2">
                      <Cake className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Doğum Tarihi *</span>
                    </div>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-[15px] px-4 py-3 text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
                    />
                  </label>
                </div>

                {/* Marketing Consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptMarketing}
                    onChange={(e) => setAcceptMarketing(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]/30"
                  />
                  <span className="text-sm text-gray-600">
                    Kampanyalar ve özel fırsatlardan haberdar olmak istiyorum
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!gender || !birthDate}
                  className={`w-full py-4 px-6 rounded-[20px] font-semibold text-white transition-all ${
                    gender && birthDate
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:shadow-lg active:scale-95'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  Randevuyu Tamamla
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
