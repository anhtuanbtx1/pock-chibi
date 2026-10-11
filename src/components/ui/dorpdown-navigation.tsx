'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, type ElementType, type FocusEvent } from 'react';

export type DropdownNavigationItem = {
  id: number;
  label: string;
  href?: string;
  subMenus?: {
    title: string;
    items: {
      label: string;
      description: string;
      href: string;
      icon: ElementType;
    }[];
  }[];
};

type DropdownNavigationProps = {
  navItems: DropdownNavigationItem[];
  ariaLabel?: string;
};

export function DropdownNavigation({
  navItems,
  ariaLabel = 'Điều hướng chính',
}: DropdownNavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const closeMenuAfterFocusLeaves = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpenMenu(null);
      setHoveredItem(null);
    }
  };

  return (
    <nav className="relative pointer-events-auto" aria-label={ariaLabel}>
      <ul className="relative flex items-center rounded-full border border-white/15 bg-[#10131b]/75 p-1 shadow-[0_12px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl">
        {navItems.map((navItem) => {
          const hasSubMenus = Boolean(navItem.subMenus?.length);
          const isOpen = openMenu === navItem.label;
          const isHighlighted = hoveredItem === navItem.id || isOpen;
          const itemClassName =
            'group relative z-10 flex cursor-pointer items-center justify-center gap-1 rounded-full px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/65 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87dff6] sm:px-4';

          return (
            <li
              key={navItem.id}
              className="relative"
              onMouseEnter={() => {
                setHoveredItem(navItem.id);
                if (hasSubMenus) setOpenMenu(navItem.label);
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
                if (hasSubMenus) setOpenMenu(null);
              }}
              onBlur={closeMenuAfterFocusLeaves}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  setOpenMenu(null);
                  event.currentTarget.querySelector<HTMLElement>('button, a')?.focus();
                }
              }}
            >
              {hasSubMenus ? (
                <button
                  type="button"
                  className={itemClassName}
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  onClick={() => setOpenMenu(isOpen ? null : navItem.label)}
                  onFocus={() => {
                    setHoveredItem(navItem.id);
                    setOpenMenu(navItem.label);
                  }}
                >
                  <span className="relative z-10">{navItem.label}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`relative z-10 h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                  {isHighlighted && (
                    <motion.span
                      layoutId="navigation-hover-background"
                      className="absolute inset-0 rounded-full bg-[#87dff6]/12"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              ) : (
                <Link
                  href={navItem.href ?? '/'}
                  className={itemClassName}
                  onFocus={() => setHoveredItem(navItem.id)}
                  onClick={() => setOpenMenu(null)}
                >
                  <span className="relative z-10">{navItem.label}</span>
                  {isHighlighted && (
                    <motion.span
                      layoutId="navigation-hover-background"
                      className="absolute inset-0 rounded-full bg-[#87dff6]/12"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </Link>
              )}

              <AnimatePresence>
                {isOpen && navItem.subMenus && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: [0.2, 0.72, 0.24, 1] }}
                    className="fixed left-3 right-3 top-[78px] z-50 pt-2 md:absolute md:left-1/2 md:right-auto md:top-full md:-translate-x-1/2"
                  >
                    <div className="max-h-[min(70vh,560px)] overflow-y-auto rounded-2xl border border-white/15 bg-[#10131b]/95 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:w-max md:max-w-[min(860px,calc(100vw-48px))]">
                      <div className="grid gap-7 md:grid-flow-col md:auto-cols-fr md:gap-9">
                        {navItem.subMenus.map((subMenu) => (
                          <div className="min-w-0 md:min-w-[190px]" key={subMenu.title}>
                            <h3 className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#87dff6]">
                              {subMenu.title}
                            </h3>
                            <ul className="space-y-1" role="menu">
                              {subMenu.items.map((item) => {
                                const Icon = item.icon;

                                return (
                                  <li key={item.label} role="none">
                                    <Link
                                      href={item.href}
                                      role="menuitem"
                                      className="group/link flex items-start gap-3 rounded-xl p-2.5 transition-colors duration-200 hover:bg-white/[0.07] focus-visible:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#87dff6]"
                                      onClick={() => setOpenMenu(null)}
                                    >
                                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-[#efc16d] transition-colors group-hover/link:border-[#87dff6]/40 group-hover/link:bg-[#4694d1]/15 group-hover/link:text-[#87dff6]">
                                        <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                                      </span>
                                      <span className="min-w-0 leading-5">
                                        <span className="block whitespace-nowrap text-sm font-medium text-white">
                                          {item.label}
                                        </span>
                                        <span className="block whitespace-nowrap text-xs text-white/50 transition-colors group-hover/link:text-white/70">
                                          {item.description}
                                        </span>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
