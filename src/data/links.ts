import { Ei18nToken } from '@i18n/types';
import { EIconLibrary, TLink, ELinkTitle, ELinkUrl, IPlatformLinkPartial } from '@/types';

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
    title: ELinkTitle.EMAIL,
    href: ELinkUrl.MAIL,
    iconPrefix: EIconLibrary.MATERIAL,
    iconName: 'mail',
    iconTitle: 'Email address',
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
    title: Ei18nToken.MY_TRAVEL_MAP_TITLE,
    href: ELinkUrl.MY_TRAVEL_MAP,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'earth-americas',
    iconTitle: 'My travel map',
  },
  {
    title: ELinkTitle.LEETCODE,
    href: ELinkUrl.LEETCODE,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'terminal',
    iconTitle: 'LeetCode',
  },
  {
    title: Ei18nToken.BLOG_TITLE,
    href: ELinkUrl.BLOG,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'book',
    iconTitle: 'Blog',
  },
];

export const socialLinks: TLink[] = [
  {
    href: ELinkUrl.TWITTER,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'twitter',
    iconTitle: ELinkTitle.TWITTER,
  },
  {
    href: ELinkUrl.REDDIT,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'reddit',
    iconTitle: ELinkTitle.REDDIT,
  },
  {
    href: ELinkUrl.INSTAGRAM,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'instagram',
    iconTitle: ELinkTitle.INSTAGRAM,
  },
  {
    href: ELinkUrl.SPOTIFY,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'spotify',
    iconTitle: ELinkTitle.SPOTIFY,
  },
  {
    href: ELinkUrl.GOOD_READS,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'goodreads',
    iconTitle: ELinkTitle.GOOD_READS,
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
    title: ELinkTitle.TWITTER,
    href: ELinkUrl.TWITTER,
    iconPrefix: EIconLibrary.FONT_AWESOME,
    iconName: 'twitter',
    iconTitle: 'Twitter account',
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
