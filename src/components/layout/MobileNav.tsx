import * as React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { NavItem, NavItemWithChildren } from '@/config/site.config';

interface MobileNavProps {
  navItems: (NavItem | NavItemWithChildren)[];
}

export default function MobileNav({ navItems }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  const isNavItemWithChildren = (
    item: NavItem | NavItemWithChildren
  ): item is NavItemWithChildren => {
    return 'items' in item;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0 flex flex-col">
        <div className="border-b border-border px-4 sm:px-6 py-4">
          <h2 className="font-bold text-lg">Navigation</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          <nav className="space-y-1">
            {navItems.map((item, index) => (
              <div key={index}>
                {isNavItemWithChildren(item) ? (
                  <details className="group">
                    <summary className="flex items-center justify-between p-2 cursor-pointer hover:bg-accent rounded-md">
                      <span className="font-medium">{item.title}</span>
                      <span className="transition-transform group-open:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <ul className="ml-4 space-y-1 mt-1">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href={subItem.href}
                            className="block p-2 text-sm hover:bg-accent rounded-md transition-colors"
                            onClick={() => setOpen(false)}
                            target={subItem.external ? '_blank' : undefined}
                            rel={subItem.external ? 'noreferrer' : undefined}
                          >
                            {subItem.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <a
                    href={item.href}
                    className="block p-2 font-medium hover:bg-accent rounded-md transition-colors"
                    onClick={() => setOpen(false)}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
