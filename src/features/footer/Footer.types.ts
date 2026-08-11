export interface FooterBrandData {
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly logoSrc?: string;
}

export interface FooterNavItem {
  readonly label: string;
  readonly href: string;
  readonly ariaLabel?: string;
}

export interface FooterContactItem {
  readonly label: string;
  readonly value: string;
  readonly href?: string;
  readonly ariaLabel?: string;
}

export interface FooterHoursItem {
  readonly day: string;
  readonly hours: string;
  readonly highlight?: boolean;
}

export interface FooterData {
  readonly brand: FooterBrandData;
  readonly navigation: readonly FooterNavItem[];
  readonly contact: readonly FooterContactItem[];
  readonly hours: readonly FooterHoursItem[];
  readonly legal: {
    readonly copy: string;
    readonly rights: string;
  };
}
