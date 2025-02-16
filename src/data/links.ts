import { Ei18nToken } from '@i18n/types';
import { EIconLibrary, TLink, ELinkTitle, ELinkUrl, IPlatformLinkPartial } from '@/types';

export const quickLinks: TLink[] = [
  {
    title: ELinkTitle.LINKEDIN,
    href: ELinkUrl.LINKEDIN,
    iconPrefix: EIconLibrary.BRANDS,
    icon: 'linkedin',
    iconTitle: 'LinkedIn account',
  },
  {
    title: ELinkTitle.GITHUB,
    href: ELinkUrl.GITHUB,
    iconPrefix: EIconLibrary.BRANDS,
    icon: 'github',
    iconTitle: 'Github account',
  },
  {
    title: ELinkTitle.EMAIL,
    href: ELinkUrl.MAIL,
    iconPrefix: EIconLibrary.MATERIAL,
    icon: 'mail',
    iconTitle: 'Email address',
  },
  {
    title: Ei18nToken.CV,
    href: ELinkUrl.CV,
    iconPrefix: EIconLibrary.MATERIAL,
    icon: 'description',
    iconTitle: 'Curriculum Vitae',
  },
];

export const platformLinks: TLink<IPlatformLinkPartial>[] = [
  {
    title: Ei18nToken.MY_TRAVEL_MAP_TITLE,
    href: ELinkUrl.MY_TRAVEL_MAP,
    iconPrefix: EIconLibrary.SOLID,
    icon: 'earth-americas',
    iconTitle: 'My travel map',
  },
  {
    title: ELinkTitle.LEETCODE,
    href: ELinkUrl.LEETCODE,
    iconPrefix: EIconLibrary.SOLID,
    icon: 'terminal',
    iconTitle: 'LeetCode',
  },
  {
    title: Ei18nToken.BLOG_TITLE,
    href: ELinkUrl.BLOG,
    iconPrefix: EIconLibrary.SOLID,
    icon: 'book',
    iconTitle: 'Blog',
  },
];

export const socialLinks: TLink[] = [
  {
    href: ELinkUrl.TWITTER,
    iconPrefix: EIconLibrary.BRANDS,
    icon: 'twitter',
    iconTitle: ELinkTitle.TWITTER,
  },
  {
    href: ELinkUrl.REDDIT,
    iconPrefix: EIconLibrary.BRANDS,
    icon: 'reddit',
    iconTitle: ELinkTitle.REDDIT,
  },
  {
    href: ELinkUrl.INSTAGRAM,
    iconPrefix: EIconLibrary.BRANDS,
    icon: 'instagram',
    iconTitle: ELinkTitle.INSTAGRAM,
  },
  {
    href: ELinkUrl.SPOTIFY,
    iconPrefix: EIconLibrary.BRANDS,
    icon: 'spotify',
    iconTitle: ELinkTitle.SPOTIFY,
  },
  {
    href: ELinkUrl.GOOD_READS,
    iconPrefix: EIconLibrary.BRANDS,
    icon: 'goodreads',
    iconTitle: ELinkTitle.GOOD_READS,
  },
];

export const copyLinks: TLink[] = [
  {
    title: ELinkTitle.LINKEDIN,
    href: ELinkUrl.LINKEDIN,
    iconPrefix: EIconLibrary.BRANDS,
    icon: 'linkedin',
    iconTitle: 'LinkedIn account',
  },
  {
    title: ELinkTitle.GITHUB,
    href: ELinkUrl.GITHUB,
    iconPrefix: EIconLibrary.BRANDS,
    icon: 'github',
    iconTitle: 'Github account',
  },
  {
    title: ELinkTitle.TWITTER,
    href: ELinkUrl.TWITTER,
    iconPrefix: EIconLibrary.BRANDS,
    icon: 'twitter',
    iconTitle: 'Twitter account',
  },
  {
    title: ELinkTitle.EMAIL,
    href: ELinkUrl.COPY_MAIL,
    iconPrefix: EIconLibrary.MATERIAL,
    icon: 'mail',
    iconTitle: 'Email address',
  },
  {
    title: 'Portfolio',
    href: ELinkUrl.PORTFOLIO,
    iconPrefix: EIconLibrary.MATERIAL,
    icon: 'description',
    iconTitle: 'Portfolio',
  },
  {
    title: Ei18nToken.CV,
    href: ELinkUrl.CV,
    iconPrefix: EIconLibrary.MATERIAL,
    icon: 'description',
    iconTitle: 'Curriculum Vitae',
  },
];
