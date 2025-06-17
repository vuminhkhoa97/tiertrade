import './global.css';
import { ThemeProvider } from '../components/theme-provider';

export const metadata = {
  title: {
    default: 'TierTrade - Premium Digital Marketplace',
    template: '%s | TierTrade'
  },
  description: 'Discover premium digital items across Mythic, Epic, and Accessory categories. Shop by tiers, themes, and find rare collectibles in our curated marketplace.',
  keywords: ['digital marketplace', 'premium items', 'mythic', 'epic', 'accessories', 'collectibles', 'tiers', 'trading'],
  authors: [{ name: 'TierTrade Team' }],
  creator: 'TierTrade',
  publisher: 'TierTrade',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tiertrade.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TierTrade - Premium Digital Marketplace',
    description: 'Discover premium digital items across Mythic, Epic, and Accessory categories. Shop by tiers, themes, and find rare collectibles in our curated marketplace.',
    url: 'https://tiertrade.com',
    siteName: 'TierTrade',
    images: [
      {
        url: '/images/banner.webp',
        width: 1200,
        height: 630,
        alt: 'TierTrade - Premium Digital Marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TierTrade - Premium Digital Marketplace',
    description: 'Discover premium digital items across Mythic, Epic, and Accessory categories.',
    images: ['/images/banner.webp'],
    creator: '@tiertrade',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TierTrade',
    description: 'Premium digital marketplace for rare and collectible items',
    url: 'https://tiertrade.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://tiertrade.com/?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TierTrade',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tiertrade.com/images/logo.svg',
      },
    },
  };

  return (
    <html lang="en" className='dark' suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
