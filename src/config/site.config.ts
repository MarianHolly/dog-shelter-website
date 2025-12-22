export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItem[];
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  mainNav: (NavItem | NavItemWithChildren)[];
  footerNav: {
    title: string;
    items: NavItem[];
  }[];
  footer: {
    copyright: string;
    tagline?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Template Astro",
  title: "Astro Template - Modern Web Development",
  description: "A modern, performant Astro template with React, Tailwind CSS, and shadcn/ui",
  url: "https://example.com",
  ogImage: "https://example.com/og.jpg",
  links: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername/template-astro",
  },
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Features",
      href: "#",
      items: [
        {
          title: "Responsive Design",
          href: "/features/responsive",
          description: "Mobile-first responsive design",
        },
        {
          title: "Performance",
          href: "/features/performance",
          description: "Optimized for speed",
        },
        {
          title: "Theming",
          href: "/features/theming",
          description: "Dark mode and theme support",
        },
      ],
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ],
  footerNav: [
    {
      title: "Product",
      items: [
        { title: "Features", href: "/features" },
        { title: "Pricing", href: "/pricing" },
        { title: "Documentation", href: "/docs" },
        { title: "Updates", href: "/updates" },
      ],
    },
    {
      title: "Company",
      items: [
        { title: "About", href: "/about" },
        { title: "Blog", href: "/blog" },
        { title: "Careers", href: "/careers" },
        { title: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      items: [
        { title: "Privacy", href: "/privacy" },
        { title: "Terms", href: "/terms" },
        { title: "License", href: "/license" },
      ],
    },
  ],
  footer: {
    copyright: `© ${new Date().getFullYear()} Template Astro. All rights reserved.`,
    tagline: "Built with Astro, React, and Tailwind CSS",
  },
};
