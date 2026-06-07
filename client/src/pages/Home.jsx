import HeroCarousel from '@/components/home/HeroCarousel';
import MenuSection from '@/components/home/MenuSection';
import ServicesSection from '@/components/home/ServicesSection';
import OutletsSection from '@/components/home/OutletsSection';

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <MenuSection />
      <ServicesSection />
      <OutletsSection />
    </div>
  );
}
