import Link from 'next/link';
import {
  DiscordIcon,
  EmailIcon,
  TwitterIcon,
} from '@tier-trade/ui';
import { Subscribe } from '../client';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">
              NAVIGATION
            </h3>{' '}
            <nav className="space-y-2">
              <Link
                href="/coming-soon"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>

              <Link
                href="/"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Marketplace
              </Link>
              <Link
                href="/coming-soon"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About us
              </Link>
            </nav>
          </div>{' '}
          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">
              CONTACT US
            </h3>
            <div className="space-y-3">
              <Link
                href="https://discord.gg/tiertrade"
                className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DiscordIcon
                  size={16}
                  className="group-hover:text-[#5865F2] transition-colors"
                />
                <span>discord.gg/tiertrade</span>
              </Link>
              <Link
                href="mailto:support@tiertrade.com"
                className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <EmailIcon
                  size={16}
                  className="group-hover:text-blue-500 transition-colors"
                />
                <span>support@tiertrade.com</span>
              </Link>
              <Link
                href="https://twitter.com/tiertrade"
                className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon
                  size={16}
                  className="group-hover:text-black dark:group-hover:text-white transition-colors"
                />
                <span>@tiertrade</span>
              </Link>
            </div>
          </div>          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4">
              NEWSLETTER
            </h3>
            <Subscribe />
          </div>
        </div>
      </div>
    </footer>
  );
}
