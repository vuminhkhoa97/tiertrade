'use client';
import { ConfirmationModal, HeartIcon } from '@tier-trade/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Favorite(props: { id: number }) {
  const [isConfirm, setIsConfirm] = useState(false);
  const router  = useRouter();

  return (
    <>
      <button
        onClick={() => setIsConfirm(true)}
        className="p-1 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
      >
        <HeartIcon className="w-5 h-5 text-muted-foreground" />
      </button>
      <ConfirmationModal
        isOpen={isConfirm}
        onClose={() => setIsConfirm(false)}
        title="Login to Favorite"
        message="You need to login to favorite this item."
        confirmText="Login"
        cancelText="Cancel"
        onConfirm={() => {
          router.push('/coming-soon');
        }}
      />
    </>
  );
}
