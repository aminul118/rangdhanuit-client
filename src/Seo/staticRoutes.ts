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
    url: 'services',
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: 'portfolio',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: 'blog',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: 'contact',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: 'privacy-policy',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: 'terms-of-service',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
];
