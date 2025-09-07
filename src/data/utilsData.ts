type UtilEntry = {
  name: string;
  description: string;
  technology: string;
  href: string;
  status: 'active' | 'experimental' | 'archived';
};

const utils: UtilEntry[] = [
  {
    name: 'denshimon',
    description:
      'Kubernetes and GitOps management platform with integrated monitoring, PASETO authentication, and single binary deployment',
    technology: 'Go',
    href: 'https://github.com/archellir/denshimon',
    status: 'active',
  },
  {
    name: 'base_infrastructure',
    description:
      'Self-hosted services infrastructure deployed on Kubernetes with persistent storage and ingress routing',
    technology: 'Kubernetes',
    href: 'https://github.com/archellir/base_infrastructure',
    status: 'active',
  },
  {
    name: 'blog.arcbjorn.com',
    description: 'Personal blog with articles about programming and technology',
    technology: 'TypeScript',
    href: 'https://github.com/archellir/blog.arcbjorn.com',
    status: 'active',
  },
  {
    name: 'torimemo',
    description:
      'Lightning-fast, lightweight AI bookmark manager with text classification and context comprehension',
    technology: 'Go',
    href: 'https://github.com/archellir/torimemo',
    status: 'active',
  },
  {
    name: 'kagikanri',
    description:
      'Modern, secure password & OTP manager leveraging linux pass utility with optional passkey support',
    technology: 'Rust',
    href: 'https://github.com/archellir/kagikanri',
    status: 'active',
  },
  {
    name: 'git.station',
    description: 'High-performance, extremely lightweight Git service',
    technology: 'Zig',
    href: 'https://github.com/archellir/git.station',
    status: 'experimental',
  },
  {
    name: 'sekisho',
    description: 'Minimal zero-trust proxy for personal use with single binary deployment',
    technology: 'Go',
    href: 'https://github.com/archellir/sekisho',
    status: 'active',
  },
  {
    name: 'ishikura-db',
    description:
      'High-performance, ACID-compliant database with enterprise-grade security features',
    technology: 'C++',
    href: 'https://github.com/arcbjorn/ishikura-db',
    status: 'experimental',
  },
  {
    name: 'crosspay',
    description: 'Verifiable, private, cross-chain payment infrastructure',
    technology: 'Solidity',
    href: 'https://github.com/arcbjorn/crosspay',
    status: 'experimental',
  },
  {
    name: 'tools',
    description: 'A clean system for managing personal CLI utilities and scripts',
    technology: 'Shell',
    href: 'https://github.com/arcbjorn/tools',
    status: 'active',
  },
  {
    name: 'solidjs-i18n',
    description: 'Lightweight, type-safe internationalization library for SolidJS',
    technology: 'TypeScript',
    href: 'https://github.com/arcbjorn/solidjs-i18n',
    status: 'active',
  },
  {
    name: 'arc-crypto-monitor',
    description: 'Single-page application for real-time cryptocurrency monitoring',
    technology: 'Vue 3',
    href: 'https://github.com/arcbjorn/arc-crypto-monitor',
    status: 'active',
  },
  {
    name: 'arc-donation-widget',
    description: 'Donation widget with payment processing and tracking',
    technology: 'Vue 3',
    href: 'https://github.com/arcbjorn/arc-donation-widget',
    status: 'experimental',
  },
  {
    name: 'dashboard.arcbjorn.com',
    description: 'Dashboard with public & internal services',
    technology: 'TypeScript',
    href: 'https://github.com/archellir/dashboard.arcbjorn.com',
    status: 'experimental',
  },
  {
    name: 'paseto-zig',
    description: 'Secure, type-safe implementation of PASETO v4 and PASERK tokens',
    technology: 'Zig',
    href: 'https://github.com/arcbjorn/paseto-zig',
    status: 'experimental',
  },
  {
    name: 'pii-autofill-extention',
    description: 'Browser extension for PII autofill functionality',
    technology: 'TypeScript',
    href: 'https://github.com/arcbjorn/pii-autofill-extention',
    status: 'experimental',
  },
  {
    name: 'hn-frontend',
    description: 'Hacker News frontend implementation',
    technology: 'TypeScript',
    href: 'https://github.com/arcbjorn/hn-frontend',
    status: 'experimental',
  },
  {
    name: 'gh-activity-graph-sh',
    description: 'GitHub activity graph generator',
    technology: 'Rust',
    href: 'https://github.com/arcbjorn/gh-activity-graph-sh',
    status: 'experimental',
  },
  {
    name: 'email-verifier',
    description: 'Email verification service with MX, SPF, and DMARC record checking',
    technology: 'Go',
    href: 'https://github.com/arcbjorn/email-verifier',
    status: 'experimental',
  },
  {
    name: 'arc-arch-linux-installation-guide',
    description: 'Comprehensive Arch Linux installation guide with Wayland desktop environment',
    technology: 'Shell',
    href: 'https://github.com/arcbjorn/arc-arch-linux-installation-guide',
    status: 'experimental',
  },
];

export default utils;
