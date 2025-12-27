import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import type { NavItem, NavItemWithChildren } from '@/config/site.config';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string; description?: string }
>(({ className, title, description, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground',
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        {description && (
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        )}
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = 'ListItem';

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
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {isNavItemWithChildren(item) ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-max md:grid-cols-1 lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {item.items.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex}
                        href={subItem.href}
                        title={subItem.title}
                        description={subItem.description}
                        target={subItem.external ? '_blank' : undefined}
                        rel={subItem.external ? 'noreferrer' : undefined}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                href={item.href}
                className={cn(
                  navigationMenuTriggerStyle(),
                  item.isListing && 'font-semibold'
                )}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
              >
                {item.title}
                {item.isListing && (
                  <svg
                    className="ml-1 h-3 w-3 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
