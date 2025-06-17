'use client';

import { useState } from 'react';
import { Button, Input, Modal } from '@tier-trade/ui';

interface SubscribeProps {
  className?: string;
}

export default function Subscribe({ className }: SubscribeProps) {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes('@')) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear the email input
      setEmail('');

      // Show thank you modal
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to subscribe:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={className}>
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading || !email}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-center p-6">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">
            Thank You for Subscribing!
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            We&apos;ve successfully added you to our newsletter. You&apos;ll
            receive updates about new products, exclusive offers, and platform
            news.
          </p>

          <Button
            variant="primary"
            onClick={handleCloseModal}
            className="w-full"
          >
            Got it!
          </Button>
        </div>
      </Modal>
    </>
  );
}
