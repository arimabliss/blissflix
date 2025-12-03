'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { type Show, type NavItem } from '@/types';
import Link from 'next/link';
import {
  cn,
  getSearchValue,
  handleDefaultSearchBtn,
  handleDefaultSearchInp,
} from '@/lib/utils';
import { siteConfig } from '@/configs/site';
import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchStore } from '@/stores/search';
import { ModeToggle as ThemeToggle } from '@/components/theme-toggle';
import { DebouncedInput } from '@/components/debounced-input';
import MovieService from '@/services/MovieService';

interface MainNavProps {
  items?: NavItem[];
}

interface SearchResult {
  results: Show[];
}

export function MainNav({ items }: MainNavProps) {
  const path = usePathname();
  const router = useRouter();
  const searchStore = useSearchStore();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('popstate', handlePopstateEvent, false);
    return () => window.removeEventListener('popstate', handlePopstateEvent, false);
  }, []);

  const handlePopstateEvent = () => {
    const pathname = window.location.pathname;
    const search: string = getSearchValue('q');

    if (!search?.length || !pathname.includes('/search')) {
      searchStore.reset();
      searchStore.setOpen(false);
    } else {
      searchStore.setOpen(true);
      searchStore.setLoading(true);
      searchStore.setQuery(search);
      setTimeout(() => handleDefaultSearchBtn(), 10);
      setTimeout(() => handleDefaultSearchInp(), 20);
      MovieService.searchMovies(search)
        .then((response: SearchResult) => {
          void searchStore.setShows(response.results);
        })
        .catch(console.error)
        .finally(() => searchStore.setLoading(false));
    }
  };

  async function searchShowsByQuery(value: string) {
    if (!value?.trim()?.length) {
      if (path === '/search') router.push('/home');
      else window.history.pushState(null, '', path);
      return;
    }

    getSearchValue('q')?.trim()?.length
      ? window.history.replaceState(null, '', `search?q=${value}`)
      : window.history.pushState(null, '', `search?q=${value}`);

    searchStore.setQuery(value);
    searchStore.setLoading(true);
    const shows = await MovieService.searchMovies(value);
    searchStore.setLoading(false);
    void searchStore.setShows(shows.results);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  React.useEffect(() => {
    const changeBg = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', changeBg);
    return () => window.removeEventListener('scroll', changeBg);
  }, [isScrolled]);

  const handleChangeStatusOpen = (val: boolean) => {
    searchStore.setOpen(val);
    if (!val) searchStore.reset();
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 z-50 flex h-16 w-full items-center justify-between px-4 backdrop-blur-xl border-b border-white/10 transition-all',
        isScrolled ? 'bg-black/80 shadow-lg' : 'bg-black/40'
      )}
    >
      {/* LOGO */}
      <motion.div whileTap={{ scale: 0.94 }} className="flex items-center gap-3">
        <Link href="/" onClick={() => handleChangeStatusOpen(false)}>
          <div className="flex items-center gap-2">
            <Icons.logo className="h-9 w-9 text-red-500" />
            <span className="hidden md:block font-bold text-lg">
              {siteConfig.name}
            </span>
          </div>
        </Link>
      </motion.div>

      {/* CENTER ACTION BUTTONS */}
      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="flex flex-col items-center justify-center rounded-xl bg-white/10 px-6 py-3 backdrop-blur-md hover:bg-white/20 transition text-center"
        >
          <Icons.list className="h-10 w-10" />
          <span className="text-xs font-semibold mt-1">Episodes</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.92 }}
          className="flex flex-col items-center justify-center rounded-xl bg-white/10 px-6 py-3 backdrop-blur-md hover:bg-white/20 transition text-center"
        >
          <Icons.cloud className="h-10 w-10" />
          <span className="text-xs font-semibold mt-1">Source</span>
        </motion.button>
      </div>

      {/* RIGHT CONTROLS */}
      <div className="flex items-center gap-3">
        <DebouncedInput
          id="search-input"
          open={searchStore.isOpen}
          value={searchStore.query}
          onChange={searchShowsByQuery}
          onChangeStatusOpen={handleChangeStatusOpen}
          containerClassName={cn(path === '/' ? 'hidden' : 'hidden md:flex')}
        />

        <motion.div whileTap={{ scale: 0.9 }}>
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default MainNav;
