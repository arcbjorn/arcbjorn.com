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
    description: 'Blog, built with Preact, Fresh & Deno',
    technology: 'TypeScript',
    href: 'https://github.com/archellir/blog.arcbjorn.com',
    status: 'active',
  },
  {
    name: 'torimemo',
    description:
      'A lightning-fast, lightweight AI bookmark manager with FastText classification & ONNX context comprehension',
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
    description:
      'A high-performance, extremely lightweight Git service built with Zig and SvelteKit',
    technology: 'Zig',
    href: 'https://github.com/archellir/git.station',
    status: 'experimental',
  },
  {
    name: 'sekisho',
    description: 'A minimal zero-trust proxy for personal use. Single Go binary, no dependencies.',
    technology: 'Go',
    href: 'https://github.com/archellir/sekisho',
    status: 'active',
  },
  {
    name: 'ishikura-db',
    description:
      'A high-performance, ACID-compliant database written in C++ with enterprise-grade security features',
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
    description: 'A lightweight, type-safe internationalization library for SolidJS applications',
    technology: 'TypeScript',
    href: 'https://github.com/arcbjorn/solidjs-i18n',
    status: 'active',
  },
  {
    name: 'arc-crypto-monitor',
    description:
      'SPA for real-time monitoring of cryptocoins, using Vue 3, Typescript, WebSockets, Docker',
    technology: 'TypeScript',
    href: 'https://github.com/arcbjorn/arc-crypto-monitor',
    status: 'active',
  },
  {
    name: 'arc-donation-widget',
    description: 'Donation widget using Vue 3, Koa.js, Docker, Typescript, MongoDB, Mongoose',
    technology: 'TypeScript',
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
    description:
      'A secure, type-safe implementation of PASETO (Platform-Agnostic Security Tokens) v4 and PASERK for Zig',
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
    description: 'Email verifier (checks MX, SPF, DMARC records)',
    technology: 'Go',
    href: 'https://github.com/arcbjorn/email-verifier',
    status: 'experimental',
  },
  {
    name: 'arc-arch-linux-installation-guide',
    description:
      'Arch linux installation guide (Wayland): btrfs, pipewire, sway, ly, wofi, waybar, dunst, foot',
    technology: 'Shell',
    href: 'https://github.com/arcbjorn/arc-arch-linux-installation-guide',
    status: 'experimental',
  },
  {
    name: 'arc-robust-arch-linux-installation-guide',
    description:
      'Arch linux installation guide (Xorg): btrfs, pipewire, i3-gaps, lightdm, rofi, dunst, kitty, polybar',
    technology: 'Shell',
    href: 'https://github.com/arcbjorn/arc-robust-arch-linux-installation-guide',
    status: 'experimental',
  },
  {
    name: 'store-management-system',
    description: 'Store management system for laptops using Go, gRPC',
    technology: 'Go',
    href: 'https://github.com/arcbjorn/store-management-system',
    status: 'experimental',
  },
];

export default utils;
