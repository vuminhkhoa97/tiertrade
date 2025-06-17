'use client';

import { Button, Card } from '@tier-trade/ui';
import { useState, useEffect } from 'react';

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Launch date - you can modify this to your desired launch date
  const launchDate = new Date('2025-12-31T00:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleNotifyMe = () => {
    // You can implement email subscription logic here
    alert('Thank you for your interest! We\'ll notify you when we launch.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/Brand Section */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-[red] bg-clip-text text-transparent mb-4">
            TierTrade
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            The ultimate marketplace experience is coming soon
          </p>
        </div>

        {/* Countdown Timer */}
        <Card variant="elevated" className="mb-8 p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
            Launch Countdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                Days
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                Hours
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                Minutes
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                Seconds
              </div>
            </div>
          </div>
        </Card>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground text-sm">
              Experience blazing fast performance with our optimized marketplace platform.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure & Trusted</h3>
            <p className="text-muted-foreground text-sm">
              Built with security-first approach to protect your data and transactions.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">User Friendly</h3>
            <p className="text-muted-foreground text-sm">
              Intuitive design that makes shopping and selling effortless for everyone.
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground mb-6">
            Be the first to know when we launch. Get exclusive early access!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleNotifyMe}
              className="px-8 py-3"
            >
              Notify Me When Ready
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/'}
              className="px-8 py-3"
            >
              Back to Home
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2025 TierTrade. All rights reserved. | Follow us for updates
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
