import { useState } from 'react';
import { Header } from './components/Header';
import { QuickActionCards } from './components/QuickActionCards';
import { ReferralCard } from './components/ReferralCard';
import { ServiceList } from './components/ServiceList';
import { DateTimePicker } from './components/DateTimePicker';
import { StickyFooter } from './components/StickyFooter';
import { BookingModal } from './components/BookingModal';
import { PriceBreakdownModal } from './components/PriceBreakdownModal';
import { WelcomeModal } from './components/WelcomeModal';
import { Search } from 'lucide-react';

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

function App() {
  const [booking, setBooking] = useState<Booking>({
    services: [],
    referralActive: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
  const [selectedGender, setSelectedGender] = useState<'woman' | 'man'>('woman');

  const handleServiceToggle = (service: Service, forGuest: boolean = false) => {
    const serviceWithGuest = { ...service, forGuest };
    const existingIndex = booking.services.findIndex(
      s => s.id === service.id && s.forGuest === forGuest
    );

    if (existingIndex >= 0) {
      // Remove service
      setBooking({
        ...booking,
        services: booking.services.filter((_, i) => i !== existingIndex),
      });
    } else {
      // Add service
      setBooking({
        ...booking,
        services: [...booking.services, serviceWithGuest],
      });
    }
  };

  const handleDateSelect = (date: string) => {
    setBooking({ ...booking, date });
  };

  const handleTimeSelect = (time: string) => {
    setBooking({ ...booking, time });
  };

  const handleReferralToggle = (active: boolean, phone: string) => {
    setBooking({ 
      ...booking, 
      referralActive: active,
      referralPhone: phone 
    });
  };

  const handleConfirmBooking = () => {
    if (booking.services.length > 0 && booking.date && booking.time) {
      setIsModalOpen(true);
    }
  };

  // Calculate totals
  const subtotal = booking.services.reduce((sum, service) => {
    if (service.usePackage) return sum; // Paket kullanılan hizmetler ücretsiz
    return sum + (service.discountedPrice || service.price);
  }, 0);

  const referralDiscount = booking.referralActive && booking.referralPhone && booking.referralPhone.length === 10 ? 100 : 0;
  const finalPrice = subtotal - referralDiscount;
  const hasDiscount = booking.services.some(s => s.discountedPrice || s.usePackage) || referralDiscount > 0;

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
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Hizmet ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-[20px] pl-12 pr-4 py-3 text-[#2D2D2D] placeholder:text-gray-400 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 shadow-sm"
          />
        </div>

        {/* Referral Card - Growth Hack Position */}
        <ReferralCard 
          onToggle={handleReferralToggle}
          active={booking.referralActive}
        />
        
        <ServiceList 
          onServiceToggle={handleServiceToggle}
          selectedServices={booking.services}
          searchQuery={searchQuery}
          referralActive={booking.referralActive}
          selectedStaff={booking.selectedStaff}
          onStaffSelect={(staff) => setBooking({ ...booking, selectedStaff: staff })}
          selectedGender={selectedGender}
        />
        
        {booking.services.length > 0 && (
          <DateTimePicker
            selectedDate={booking.date}
            selectedTime={booking.time}
            onDateSelect={handleDateSelect}
            onTimeSelect={handleTimeSelect}
            totalDuration={totalDuration}
          />
        )}
      </div>

      {booking.services.length > 0 && (
        <StickyFooter
          originalPrice={subtotal}
          finalPrice={finalPrice}
          hasDiscount={hasDiscount}
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

export default App;