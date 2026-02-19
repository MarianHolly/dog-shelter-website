import * as React from 'react';
import { cn } from '@/lib/utils';
import type { NavItem, NavItemWithChildren } from '@/config/site.config';

interface NavbarProps {
  navItems: (NavItem | NavItemWithChildren)[];
}

export default function Navbar({ navItems }: NavbarProps) {
  const isNavItemWithChildren = (
    item: NavItem | NavItemWithChildren
  ): item is NavItemWithChildren => {
    return 'items' in item;
  };

  return (
    <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Hlavná navigácia">
      {navItems.filter((item) => !('mobileOnly' in item && item.mobileOnly)).map((item, index) => {
        if (isNavItemWithChildren(item)) {
          return (
            <div key={index} className="relative group">
              <button
                className={cn(
                  'px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                )}
                aria-haspopup="true"
                aria-expanded="false"
              >
                {item.title}
                <svg
                  className="ml-1 h-3 w-3 inline-block transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className="absolute left-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50"
                role="menu"
                aria-label={`${item.title} podmenu`}
              >
                <div className="bg-background border border-border rounded-lg shadow-lg py-2">
                  {item.items.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:text-foreground focus-visible:outline-none transition-colors"
                      target={subItem.external ? '_blank' : undefined}
                      rel={subItem.external ? 'noreferrer' : undefined}
                      role="menuitem"
                    >
                      {subItem.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <a
            key={index}
            href={item.href}
            className={cn(
              'px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              item.isListing && 'font-semibold'
            )}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
          >
            {item.title}
          </a>
        );
      })}
    </nav>
  );
}
