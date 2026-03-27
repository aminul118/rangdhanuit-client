import { Routes } from '@/types';

export const staticRoutes: Routes[] = [
  {
    url: '',
    changeFrequency: 'monthly',
    priority: 1.0,
  },
  {
    url: 'about',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: 'portfolio',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: 'contact',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
];
