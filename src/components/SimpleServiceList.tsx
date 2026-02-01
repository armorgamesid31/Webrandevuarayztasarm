import { ServiceCard } from './ServiceCard';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description?: string;
  category?: string;
}

interface SelectedService extends Service {
  forGuest?: boolean;
}

interface SimpleServiceListProps {
  services: Service[];
  selectedServices: SelectedService[];
  onServiceAdd: (service: Service) => void;
  onGuestToggle: (serviceId: string) => void;
}

/**
 * Service List Component
 * - Maps through services and renders ServiceCard components
 * - All data comes from props
 * - No empty states, no search logic
 */
export function SimpleServiceList({
  services,
  selectedServices,
  onServiceAdd,
  onGuestToggle,
}: SimpleServiceListProps) {
  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some((s) => s.id === serviceId);
  };

  const getServiceGuestStatus = (serviceId: string) => {
    const service = selectedServices.find((s) => s.id === serviceId);
    return service?.forGuest || false;
  };

  return (
    <div className="space-y-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          name={service.name}
          price={service.price}
          duration={service.duration}
          description={service.description}
          isSelected={isServiceSelected(service.id)}
          forGuest={getServiceGuestStatus(service.id)}
          onAdd={() => onServiceAdd(service)}
          onGuestToggle={() => onGuestToggle(service.id)}
        />
      ))}
    </div>
  );
}
