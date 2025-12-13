// import type { FooterItem, MainNavItem } from "@/types"
//
// import { productCategories } from "@/config/products"
// import { slugify } from "@/lib/utils"

import { Icons } from '@/components/icons';
import { env } from '@/env.mjs';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  author: env.NEXT_PUBLIC_SITE_NAME,
  slogan: 'Watch TV Shows Online, Watch Movies Online.',
  description:
    'Watch movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.',
  keywords: [
    'watch movies',
    'movies online',
    'watch TV',
    'TV online',
    'TV shows online',
    'watch TV shows',
    'stream movies',
    'stream tv',
    'instant streaming',
    'watch online',
    'movies',
    'watch TV online',
    'no download',
    'full length movies',
    env.NEXT_PUBLIC_SITE_NAME,
  ],
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/images/hero.jpg`,
  links: {
    twitter: `${env.NEXT_PUBLIC_TWITTER}`,
    github: 'https://blinime.vercel.app/home',
    githubAccount: '',
  },
  socialLinks: [
    {
      title: 'Facebook',
      href: `${env.NEXT_PUBLIC_FACEBOOK}`,
      icon: Icons.facebook,
    },
    {
      title: 'Instagram',
      href: `${env.NEXT_PUBLIC_INSTAGRAM}`,
      icon: Icons.instagram,
    },
    {
      title: 'Twitter',
      href: `${env.NEXT_PUBLIC_TWITTER}`,
      icon: Icons.twitter,
    },
    {
      title: 'Youtube',
      href: `${env.NEXT_PUBLIC_YOUTUBE}`,
      icon: Icons.youtube,
    },
  ],
  footerItems: [
    { title: 'music streaming website', href: 'https://blisic.vercel.app/' },
    { title: 'discord srvr', href: 'https://discord.gg/jH7HpVQbH3' },
    { title: 'movie website', href: '/' },
    { title: 'devloper portfolio', href: 'https://arimadev.vercel.app/' },
    { title: 'got any work/project? click here ', href: 'mailto:gfxethion@gmail.com' },
    { title: 'anime website', href: 'https://blinime.vercel.app/home' },
    { title: 'Terms of Use', href: '/terms-of-use' },
    { title: 'Privacy', href: '/' },
    { title: 'Legal Notices', href: '/' },
    { title: 'Cookie Preferences', href: '/' },
    { title: 'Corporate Information', href: '/' },
    { title: 'Contact Us', href: 'mailto:gfxethion@gmail.com' },
  ],
  mainNav: [
    {
      title: 'Home',
      href: '/home',
      // icon: Icons.play,
    },
    {
      title: 'TV Shows',
      href: '/tv-shows',
      // icon: Icons.tvShow,
    },
    {
      title: 'Movies',
      href: '/movies',
      // icon: Icons.movie,
    },
    {
      title: 'Anime',
      href: '/anime',
      // icon: Icons.list,
    },
    {
      title: 'New & Popular',
      href: '/new-and-popular',
      // icon: Icons.trendingUp,
    },
  ],
};
