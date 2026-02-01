import { useState } from 'react';
import { Header } from '../components/Header';
import { QuickActionCards } from '../components/QuickActionCards';
import { SearchBar } from '../components/SearchBar';
import { ReferralBanner } from '../components/ReferralBanner';
import { ServiceList } from '../../components/ServiceList';
import { DateTimePicker } from '../../components/DateTimePicker';
import { PriceFooter } from '../components/PriceFooter';
import { BookingModal } from '../../components/BookingModal';
import { PriceBreakdownModal } from '../../components/PriceBreakdownModal';
import { WelcomeModal } from '../components/WelcomeModal';

export interface Service {
  id: string;
  name: string;
  duration: string;
  durationMinutes: number;
  price: number;
  discountedPrice?: number;
  forGuest?: boolean;
  usePackage?: boolean;
  packageSessionsLeft?: number;
}

export interface Booking {
  services: Service[];
  date?: string;
  time?: string;
  referralPhone?: string;
  referralActive: boolean;
  selectedStaff?: string;
}

export function Home() {
  const [booking, setBooking] = useState<Booking>({
    services: [],
    referralActive: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
  const [selectedGender, setSelectedGender] = useState<'woman' | 'man'>('woman');
  const [referralPhone, setReferralPhone] = useState('');

  const handleServiceToggle = (service: Service, forGuest: boolean = false) => {
    const serviceWithGuest = { ...service, forGuest };
    const existingIndex = booking.services.findIndex(
      (s) => s.id === service.id && s.forGuest === forGuest
    );

    if (existingIndex >= 0) {
      setBooking({
        ...booking,
        services: booking.services.filter((_, i) => i !== existingIndex),
      });
    } else {
      setBooking({
        ...booking,
        services: [...booking.services, serviceWithGuest],
      });
    }
  };

  const handleReferralToggle = () => {
    setBooking({
      ...booking,
      referralActive: !booking.referralActive,
      referralPhone: !booking.referralActive ? referralPhone : '',
    });
  };

  const handlePhoneChange = (phone: string) => {
    setReferralPhone(phone);
    if (booking.referralActive) {
      setBooking({ ...booking, referralPhone: phone });
    }
  };

  const handleConfirmBooking = () => {
    if (booking.services.length > 0 && booking.date && booking.time) {
      setIsModalOpen(true);
    }
  };

  // Calculate totals
  const subtotal = booking.services.reduce((sum, service) => {
    if (service.usePackage) return sum;
    return sum + (service.discountedPrice || service.price);
  }, 0);

  const referralDiscount =
    booking.referralActive && referralPhone.length === 10 ? 100 : 0;
  const finalPrice = subtotal - referralDiscount;
  const hasDiscount =
    booking.services.some((s) => s.discountedPrice || s.usePackage) ||
    referralDiscount > 0;

  const totalDuration = booking.services.reduce((sum, service) => {
    return sum + service.durationMinutes;
  }, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-32">
      <Header
        customerName="Ayşe"
        selectedGender={selectedGender}
        onGenderClick={() => setIsWelcomeModalOpen(true)}
      />

      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        <QuickActionCards />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <ReferralBanner
          isActive={booking.referralActive}
          phoneValue={referralPhone}
          onToggle={handleReferralToggle}
          onPhoneChange={handlePhoneChange}
        />

        <ServiceList
          onServiceToggle={handleServiceToggle}
          selectedServices={booking.services}
          searchQuery={searchQuery}
          selectedStaff={booking.selectedStaff}
          onStaffSelect={(staff) => setBooking({ ...booking, selectedStaff: staff })}
          selectedGender={selectedGender}
        />

        {booking.services.length > 0 && (
          <DateTimePicker
            selectedDate={booking.date}
            selectedTime={booking.time}
            onDateSelect={(date) => setBooking({ ...booking, date })}
            onTimeSelect={(time) => setBooking({ ...booking, time })}
            totalDuration={totalDuration}
          />
        )}
      </div>

      {booking.services.length > 0 && (
        <PriceFooter
          originalPrice={subtotal}
          finalPrice={finalPrice}
          showDiscount={hasDiscount}
          isEnabled={!!(booking.services.length > 0 && booking.date && booking.time)}
          onConfirm={handleConfirmBooking}
          onShowBreakdown={() => setIsPriceModalOpen(true)}
        />
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={booking}
      />

      <PriceBreakdownModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        services={booking.services}
        referralDiscount={referralDiscount}
        subtotal={subtotal}
        finalPrice={finalPrice}
      />

      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onSelectGender={(gender) => {
          setSelectedGender(gender);
          setIsWelcomeModalOpen(false);
        }}
      />
    </div>
  );
}