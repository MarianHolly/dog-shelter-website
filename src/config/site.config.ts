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
  name: "Dog Shelter",
  title: "Dog Shelter - Find Your New Best Friend",
  description: "A caring dog shelter dedicated to finding loving homes for dogs in need",
  url: "https://example.com",
  ogImage: "https://example.com/og.jpg",
  links: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername/dog-shelter-website",
  },
  mainNav: [
    {
      title: "Domov",
      href: "/",
    },
    {
      title: "Psíci",
      href: "/psici",
    },
    {
      title: "Adopcia",
      href: "/adopcia",
    },
    {
      title: "Ako pomôcť",
      href: "/ako-pomoct",
    },
    {
      title: "O nás",
      href: "/o-nas",
    },
    {
      title: "Kontakt",
      href: "/kontakt",
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
