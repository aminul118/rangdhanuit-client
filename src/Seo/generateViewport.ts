import { Viewport } from 'next';

const generateViewport = (): Viewport => {
  return {
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#09090b' },
    ],
    colorScheme: 'dark light',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  };
};

export default generateViewport;
