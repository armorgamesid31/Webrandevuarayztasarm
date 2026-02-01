import { useState } from 'react';
import { ChevronDown, Check, Package, User, Gift, Zap } from 'lucide-react';
import type { Service } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { universalCategories } from '../data/services';

interface ServiceListProps {
  onServiceToggle: (service: Service, forGuest?: boolean) => void;
  selectedServices: Service[];
  searchQuery: string;
  referralActive: boolean;
  selectedStaff?: string;
  onStaffSelect: (staffId: string) => void;
  selectedGender: 'woman' | 'man';
}

const staffOptions = [
  { id: 'any', name: 'Fark Etmez', emoji: '👤' },
  { id: 'staff1', name: 'Zeynep', emoji: '👩' },
  { id: 'staff2', name: 'Aylin', emoji: '👩‍🦰' },
  { id: 'staff3', name: 'Elif', emoji: '👩‍🦱' },
];

export function ServiceList({ 
  onServiceToggle, 
  selectedServices, 
  searchQuery, 
  selectedStaff, 
  onStaffSelect,
  selectedGender 
}: ServiceListProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Epilasyon & Tüy Alma');
  const [staffDropdownOpen, setStaffDropdownOpen] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const getSelectedService = (serviceId: string) => {
    return selectedServices.find(s => s.id === serviceId);
  };

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some(s => s.id === serviceId);
  };

  const toggleGuestMode = (serviceData: any) => {
    const existingService = getSelectedService(serviceData.id);
    if (existingService) {
      // Toggle the forGuest property
      const price = selectedGender === 'woman' ? serviceData.priceWoman : serviceData.priceMan;
      const discountedPrice = selectedGender === 'woman' 
        ? serviceData.discountedPriceWoman 
        : serviceData.discountedPriceMan;
      
      const updatedService: Service = {
        ...existingService,
        forGuest: !existingService.forGuest,
      };
      
      onServiceToggle(updatedService, !existingService.forGuest);
    }
  };

  const togglePackageMode = (serviceData: any) => {
    const existingService = getSelectedService(serviceData.id);
    const price = selectedGender === 'woman' ? serviceData.priceWoman : serviceData.priceMan;
    const discountedPrice = selectedGender === 'woman' 
      ? serviceData.discountedPriceWoman 
      : serviceData.discountedPriceMan;

    if (existingService && !existingService.usePackage) {
      // Enable package mode
      const serviceWithPackage: Service = {
        id: serviceData.id,
        name: serviceData.name,
        duration: serviceData.duration,
        durationMinutes: serviceData.durationMinutes,
        price: 0,
        discountedPrice: 0,
        usePackage: true,
        packageSessionsLeft: serviceData.packageSessionsLeft,
        forGuest: false,
      };
      onServiceToggle(serviceWithPackage, false);
    } else if (existingService && existingService.usePackage) {
      // Disable package mode - revert to normal pricing
      const service: Service = {
        id: serviceData.id,
        name: serviceData.name,
        duration: serviceData.duration,
        durationMinutes: serviceData.durationMinutes,
        price,
        discountedPrice,
        packageSessionsLeft: serviceData.packageSessionsLeft,
      };
      onServiceToggle(service, false);
    }
  };

  return (
    <div className="space-y-3">
      {universalCategories.map((category) => {
        // Filter services based on search and gender availability
        const filteredServices = category.services.filter(service => {
          const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
          const price = selectedGender === 'woman' ? service.priceWoman : service.priceMan;
          const isAvailable = price > 0; // Service available for this gender
          return matchesSearch && isAvailable;
        });

        // Don't show empty categories
        if (filteredServices.length === 0) return null;

        return (
          <div key={category.name}>
            <div className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-xl">
                    {category.icon}
                  </div>
                  <span className="font-medium text-[#2D2D2D]">{category.name}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {filteredServices.length}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedCategory === category.name ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Service Items */}
              {expandedCategory === category.name && (
                <div className="border-t border-gray-100">
                  {filteredServices.map((serviceData) => {
                    const selectedService = getSelectedService(serviceData.id);
                    const isSelected = isServiceSelected(serviceData.id);
                    
                    const price = selectedGender === 'woman' ? serviceData.priceWoman : serviceData.priceMan;
                    const discountedPrice = selectedGender === 'woman' 
                      ? serviceData.discountedPriceWoman 
                      : serviceData.discountedPriceMan;

                    return (
                      <motion.div
                        key={serviceData.id}
                        layout
                        className={`border-b border-gray-50 last:border-b-0 transition-all ${
                          isSelected ? 'bg-[#FFFBEB] border-l-4 border-l-[#D4AF37]' : 'bg-white'
                        }`}
                      >
                        <div className="px-4 py-4">
                          {/* Main Service Row */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-[#2D2D2D]">{serviceData.name}</h4>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="text-sm text-gray-500">{serviceData.duration}</span>
                                
                                {serviceData.hasSynergy && (
                                  <motion.span 
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="text-xs bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm"
                                  >
                                    <Zap className="w-3 h-3" />
                                    {serviceData.synergyBadge}
                                  </motion.span>
                                )}
                                
                                {serviceData.hasPackage && !serviceData.hasSynergy && (
                                  <span className="text-xs bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Package className="w-3 h-3" />
                                    Paket var
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Price */}
                              <div className="text-right">
                                {selectedService?.usePackage ? (
                                  <p className="font-semibold text-[#10B981]">Ücretsiz</p>
                                ) : discountedPrice ? (
                                  <>
                                    <p className="text-sm text-gray-400 line-through">{price} TL</p>
                                    <p className="font-semibold text-[#10B981]">{discountedPrice} TL</p>
                                  </>
                                ) : (
                                  <p className="font-semibold text-[#2D2D2D]">{price} TL</p>
                                )}
                              </div>

                              {/* Add/Added Button */}
                              <button
                                onClick={() => {
                                  if (isSelected) {
                                    // Remove service
                                    const service: Service = {
                                      id: serviceData.id,
                                      name: serviceData.name,
                                      duration: serviceData.duration,
                                      durationMinutes: serviceData.durationMinutes,
                                      price,
                                      discountedPrice,
                                      packageSessionsLeft: serviceData.packageSessionsLeft,
                                    };
                                    onServiceToggle(service, selectedService?.forGuest);
                                  } else {
                                    // Add service for me
                                    const service: Service = {
                                      id: serviceData.id,
                                      name: serviceData.name,
                                      duration: serviceData.duration,
                                      durationMinutes: serviceData.durationMinutes,
                                      price,
                                      discountedPrice,
                                      packageSessionsLeft: serviceData.packageSessionsLeft,
                                    };
                                    onServiceToggle(service, false);
                                  }
                                }}
                                className={`px-4 py-2 rounded-[12px] font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                                  isSelected
                                    ? 'bg-[#D4AF37] text-white shadow-sm'
                                    : 'border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/5'
                                }`}
                              >
                                {isSelected ? (
                                  <>
                                    <Check className="w-4 h-4" />
                                    <span className="text-sm">Eklendi</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-lg leading-none">+</span>
                                    <span className="text-sm">Ekle</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Configuration Row - Only shown when selected */}
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-4 flex flex-wrap items-center gap-2"
                              >
                                {/* Staff Selector Chip */}
                                <div className="relative">
                                  <button
                                    onClick={() => setStaffDropdownOpen(staffDropdownOpen === serviceData.id ? null : serviceData.id)}
                                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm flex items-center gap-2 hover:border-[#D4AF37] transition-colors"
                                  >
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span className="text-[#2D2D2D]">
                                      Çalışan: <span className="font-medium">
                                        {staffOptions.find(s => s.id === selectedStaff)?.name || 'Fark Etmez'}
                                      </span>
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                  </button>

                                  {/* Staff Dropdown */}
                                  {staffDropdownOpen === serviceData.id && (
                                    <motion.div
                                      initial={{ opacity: 0, y: -10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className="absolute top-full left-0 mt-1 bg-white rounded-[12px] shadow-lg border border-gray-200 py-1 z-10 min-w-[180px]"
                                    >
                                      {staffOptions.map((staff) => (
                                        <button
                                          key={staff.id}
                                          onClick={() => {
                                            onStaffSelect(staff.id);
                                            setStaffDropdownOpen(null);
                                          }}
                                          className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
                                            selectedStaff === staff.id ? 'bg-[#D4AF37]/10' : ''
                                          }`}
                                        >
                                          <span className="text-lg">{staff.emoji}</span>
                                          <span className="text-sm text-[#2D2D2D]">{staff.name}</span>
                                          {selectedStaff === staff.id && (
                                            <Check className="w-4 h-4 text-[#D4AF37] ml-auto" />
                                          )}
                                        </button>
                                      ))}
                                    </motion.div>
                                  )}
                                </div>

                                {/* Guest Selector Chip */}
                                <button
                                  onClick={() => toggleGuestMode(serviceData)}
                                  className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition-all ${
                                    selectedService?.forGuest
                                      ? 'bg-[#D4AF37] text-white'
                                      : 'bg-white border border-gray-200 text-[#2D2D2D] hover:border-[#D4AF37]'
                                  }`}
                                >
                                  {selectedService?.forGuest ? (
                                    <>
                                      <Gift className="w-4 h-4" />
                                      <span>Misafir için</span>
                                    </>
                                  ) : (
                                    <>
                                      <User className="w-4 h-4 text-gray-500" />
                                      <span>Bana</span>
                                    </>
                                  )}
                                </button>

                                {/* Package Chip - Only if package available */}
                                {serviceData.hasPackage && (
                                  <button
                                    onClick={() => togglePackageMode(serviceData)}
                                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 transition-all ${
                                      selectedService?.usePackage
                                        ? 'bg-[#10B981] text-white'
                                        : 'bg-white border border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/5'
                                    }`}
                                  >
                                    <Package className="w-4 h-4" />
                                    <span>Paketimi Kullan</span>
                                    <span className="text-xs opacity-80">
                                      ({serviceData.packageSessionsLeft} kaldı)
                                    </span>
                                  </button>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}