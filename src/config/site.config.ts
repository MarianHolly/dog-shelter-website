export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  description?: string;
  isListing?: boolean; // For pages that lead to listings (Psíci, Blog)
  mobileOnly?: boolean; // Only shown in mobile navigation
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
    facebook?: string;
    instagram?: string;
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
  name: "Trenčianský útulok",
  title: "Trenčianský útulok - Nekupuj, adoptuj si psíka od nás",
  description: "Pomáhame opusteným a týraným psom nájsť ich nový domov. Od roku 2011 zachraňujeme psíkov v Trenčíne.",
  url: "https://utulok-trencin.sk",
  ogImage: "/logo-utulok.png",
  links: {
    facebook: "https://www.facebook.com/trencianskyutulok",
    instagram: "https://www.instagram.com/trencianskyutulok",
  },
  mainNav: [
    {
      title: "Domov",
      href: "/",
      mobileOnly: true,
    },
    {
      title: "O nás",
      href: "/o-nas",
    },
    {
      title: "Ako pomôcť",
      href: "/ako-pomoct",
    },
    {
      title: "Adopcia",
      href: "/adopcia",
    },
    {
      title: "Psíci",
      href: "/psici",
      isListing: true,
    },
    {
      title: "Blog",
      href: "/blog",
      isListing: true,
    },
    {
      title: "Kontakt",
      href: "/kontakt",
    },
  ],
  footerNav: [
    {
      title: "Útulok",
      items: [
        { title: "O nás", href: "/o-nas" },
        { title: "Naši psíci", href: "/psici" },
        { title: "Adopcia", href: "/adopcia" },
        { title: "Blog", href: "/blog" },
        { title: "Kontakt", href: "/kontakt" },
      ],
    },
    {
      title: "Ako pomôcť",
      items: [
        { title: "2% z daní", href: "/ako-pomoct#2-z-dani" },
        { title: "Finančný príspevok", href: "/ako-pomoct#financny-prispevok" },
        { title: "Virtuálna adopcia", href: "/ako-pomoct#virtualna-adopcia" },
        { title: "Dobrovoľníctvo", href: "/ako-pomoct#dobrovolnictvo" },
      ],
    },
    {
      title: "Kontakt",
      items: [
        { title: "+421 915 785 007", href: "tel:+421915785007" },
        { title: "utulok.trencin@gmail.com", href: "mailto:utulok.trencin@gmail.com" },
        { title: "Facebook", href: "https://www.facebook.com/trencianskyutulok", external: true },
        { title: "Brnianska 2480, Trenčín", href: "https://goo.gl/maps/xxxxx", external: true },
        { title: "Ochrana osobných údajov", href: "/ochrana-udajov" },
      ],
    },
  ],
  footer: {
    copyright: `© ${new Date().getFullYear()} Trenčianský útulok. Všetky práva vyhradené.`,
    tagline: "Nekupuj, adoptuj si psíka od nás 🐾",
  },
};
