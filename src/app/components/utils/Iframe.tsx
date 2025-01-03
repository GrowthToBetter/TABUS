import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

interface IFrameViewerProps {
  url: string;
  onClose?: () => void;
}

export const IFrameViewer: React.FC<IFrameViewerProps> = ({ url, onClose }) => {
  return (
    <Dialog.Root defaultOpen>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content 
          className="fixed inset-0 z-50 flex items-center justify-center"
          onEscapeKeyDown={onClose}
        >
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto my-auto p-4">
            <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <Dialog.Close asChild>
                  <button
                    onClick={onClose}
                    className="rounded-full p-2 bg-black/50 hover:bg-black/70 transition-colors"
                    aria-label="Close preview"
                  >
                    <Cross2Icon className="h-4 w-4 text-white" />
                  </button>
                </Dialog.Close>
              </div>
              <iframe
                src={url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-scripts allow-modals allow-popups allow-presentation allow-same-origin"
                allowFullScreen
              />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};


