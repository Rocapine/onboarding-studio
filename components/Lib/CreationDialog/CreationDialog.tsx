import React from 'react';
import { Dialog } from 'tamagui';


export const CreationDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        key="overlay"
        backgroundColor="$shadow6"
        animation="quicker"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Dialog.Content bordered
        elevate
        key="content"
        animateOnly={['transform', 'opacity']}
        animation={[
          'quickest',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        gap="$4"
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};
