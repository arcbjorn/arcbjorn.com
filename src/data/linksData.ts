import { Ei18nToken } from '@i18n/types';
import { EIconLibrary, TLink, ELinkTitle, ELinkUrl, IPlatformLinkPartial } from '@/types/types';

export const quickLinks: TLink[] = [
  {
    title: ELinkTitle.LINKEDIN,
    href: ELinkUrl.LINKEDIN,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'linkedin',
    iconTitle: 'LinkedIn account',
  },
  {
    title: ELinkTitle.GITHUB,
    href: ELinkUrl.GITHUB,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'github',
    iconTitle: 'Github account',
  },
  {
    title: Ei18nToken.BLOG_TITLE,
    href: ELinkUrl.BLOG,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'book',
    iconTitle: 'Blog',
  },
  {
    title: Ei18nToken.CV,
    href: ELinkUrl.CV,
    iconPrefix: EIconLibrary.MATERIAL,
    iconName: 'description',
    iconTitle: 'Curriculum Vitae',
  },
];

export const platformLinks: TLink<IPlatformLinkPartial>[] = [
  {
    title: ELinkTitle.LEETCODE,
    href: ELinkUrl.LEETCODE,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'terminal',
    iconTitle: 'LeetCode',
  },
  {
    title: Ei18nToken.DASHBOARD_TITLE,
    href: ELinkUrl.DASHBOARD,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'earth-americas',
    iconTitle: 'Dashboard',
  },
];

export const socialLinks: TLink[] = [
  {
    href: ELinkUrl.X,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'x-twitter',
    iconTitle: ELinkTitle.X,
  },
  {
    href: ELinkUrl.INSTAGRAM,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'instagram',
    iconTitle: ELinkTitle.INSTAGRAM,
  },
];

export const quickAccessLinks: TLink[] = [
  {
    title: ELinkTitle.LINKEDIN,
    href: ELinkUrl.LINKEDIN,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'linkedin',
    iconTitle: 'LinkedIn account',
  },
  {
    title: ELinkTitle.GITHUB,
    href: ELinkUrl.GITHUB,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'github',
    iconTitle: 'Github account',
  },
  {
    title: ELinkTitle.X,
    href: ELinkUrl.X,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'x-twitter',
    iconTitle: 'X account',
  },
  {
    title: ELinkTitle.EMAIL,
    href: ELinkUrl.COPY_MAIL,
    iconPrefix: EIconLibrary.MATERIAL,
    iconName: 'mail',
    iconTitle: 'Email address',
  },
  {
    title: 'Portfolio',
    href: ELinkUrl.PORTFOLIO,
    iconPrefix: EIconLibrary.MATERIAL,
    iconName: 'description',
    iconTitle: 'Portfolio',
  },
  {
    title: Ei18nToken.CV,
    href: ELinkUrl.CV,
    iconPrefix: EIconLibrary.MATERIAL,
    iconName: 'description',
    iconTitle: 'Curriculum Vitae',
  },
];
