import Image from 'next/image';
import {
  PixelShirtIcon,
  PixelHatIcon,
  PixelShoesIcon,
  PixelAccessoryIcon,
} from '@tier-trade/ui';

export default function Header() {
  return (
    <div
      style={{
        backgroundImage: 'url(/images/banner.webp)',
        backgroundRepeat: 'no-repeat',
      }}
      className={`bg-background dark:bg-card border-b bg-cover border-border`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-8">
          {' '}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-[red]  bg-clip-text text-transparent mb-4">
                TierTrade
              </h1>
            </div>
            <p className="text-lg text-muted-foreground font-medium mb-4">
              Where Every Item Finds Its Perfect Tier
            </p>
            {/* Small product previews */}
            <div className="flex space-x-4 mt-6">
              {[
                { id: 1, icon: PixelShirtIcon, label: 'Clothing' },
                { id: 2, icon: PixelHatIcon, label: 'Hats' },
                { id: 3, icon: PixelShoesIcon, label: 'Shoes' },
                { id: 4, icon: PixelAccessoryIcon, label: 'Accessories' },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className="w-12 h-12 border-1  border-ring bg-muted flex items-center justify-center hover:bg-accent transition-colors cursor-pointer group"
                    title={item.label}
                  >
                    <IconComponent
                      className="text-muted-foreground group-hover:text-accent-foreground transition-colors"
                      size={20}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* Featured Product */}
          <div className="flex-shrink-0 ml-8">
            <div className="w-64  border-2 border-border bg-muted flex items-center justify-center relative hover:bg-accent transition-colors">
              <Image
                src={'/images/logo.svg'}
                alt="Tier Trade Logo"
                width={252}
                height={188}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
