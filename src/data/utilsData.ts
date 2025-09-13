type UtilEntry = {
  name: string;
  description: string;
  technology: string;
  href: string;
};

const utils: UtilEntry[] = [
  {
    name: 'denshimon',
    description: 'Kubernetes and GitOps management platform with monitoring and PASETO auth',
    technology: 'Go, React, TS',
    href: 'https://github.com/archellir/denshimon',
  },
  {
    name: 'crosspay',
    description: 'Verifiable, private, cross-chain payment infrastructure',
    technology: 'Go, Solidity, Svelte, TS',
    href: 'https://github.com/arcbjorn/crosspay',
  },
  {
    name: 'kagikanri',
    description:
      'Modern, secure password & OTP manager leveraging linux pass utility with passkey support',
    technology: 'Rust, Svelte, TS',
    href: 'https://github.com/archellir/kagikanri',
  },
  {
    name: 'paseto-zig',
    description: 'Secure, type-safe implementation of PASETO v4 and PASERK tokens',
    technology: 'Zig',
    href: 'https://github.com/arcbjorn/paseto-zig',
  },
  {
    name: 'ishikura-db',
    description: 'High-performance, ACID-compliant database',
    technology: 'C++',
    href: 'https://github.com/arcbjorn/ishikura-db',
  },
  {
    name: 'torimemo',
    description:
      'Lightning-fast, lightweight AI bookmark manager with text classification and context comprehension',
    technology: 'Go, TS, Lit, FastText, ONNX',
    href: 'https://github.com/archellir/torimemo',
  },
  {
    name: 'sekisho',
    description: 'Minimal zero-trust proxy for personal use with single binary deployment',
    technology: 'Go',
    href: 'https://github.com/archellir/sekisho',
  },
  {
    name: 'arc-arch-linux-installation-guide',
    description:
      'Comprehensive Arch Linux installation guide with Wayland: btrfs, pipewire, sway, ly, wofi, waybar, dunst, foot',
    technology: 'Shell',
    href: 'https://github.com/arcbjorn/arc-arch-linux-installation-guide',
  },
  {
    name: 'mailcross',
    description: 'Fast, secure, and keyboard-driven multi-account email client',
    technology: 'Rust, IMAP',
    href: 'https://github.com/arcbjorn/mailcross',
  },
  {
    name: 'tools',
    description: 'A clean system for managing personal CLI utilities and scripts',
    technology: 'Shell',
    href: 'https://github.com/arcbjorn/tools',
  },
  {
    name: 'base_infrastructure',
    description:
      'Self-hosted services infrastructure deployed on Kubernetes with persistent storage and ingress routing',
    technology: 'Kubernetes',
    href: 'https://github.com/archellir/base_infrastructure',
  },
  {
    name: 'blog.arcbjorn.com',
    description: 'Personal blog with articles about programming and technology',
    technology: 'Preact, Fresh, Deno',
    href: 'https://github.com/archellir/blog.arcbjorn.com',
  },
  {
    name: 'arc-crypto-monitor',
    description: 'Single-page application for real-time cryptocurrency monitoring',
    technology: 'Vue 3, TS, WebSockets, Docker',
    href: 'https://github.com/arcbjorn/arc-crypto-monitor',
  },
  {
    name: 'arc-donation-widget',
    description: 'Donation widget with payment processing and tracking',
    technology: 'Vue 3, Koa.js, TS, MongoDB',
    href: 'https://github.com/arcbjorn/arc-donation-widget',
  },
  {
    name: 'solidjs-i18n',
    description: 'Lightweight, type-safe internationalization library',
    technology: 'SolidJS, TS',
    href: 'https://github.com/arcbjorn/solidjs-i18n',
  },
  {
    name: 'dashboard.arcbjorn.com',
    description: 'Dashboard with public & internal services',
    technology: 'Astro, Preact, TS',
    href: 'https://github.com/archellir/dashboard.arcbjorn.com',
  },
  {
    name: 'git.station',
    description: 'High-performance, extremely lightweight Git service',
    technology: 'Zig, Svelte',
    href: 'https://github.com/archellir/git.station',
  },
  {
    name: 'pii-autofill-extention',
    description: 'Browser extension for PII autofill functionality',
    technology: 'TS',
    href: 'https://github.com/arcbjorn/pii-autofill-extention',
  },
  {
    name: 'hn-frontend',
    description: 'Hacker News frontend implementation',
    technology: 'Hyperapp, TS',
    href: 'https://github.com/arcbjorn/hn-frontend',
  },
  {
    name: 'gh-activity-graph-sh',
    description: 'GitHub activity graph generator',
    technology: 'Rust',
    href: 'https://github.com/arcbjorn/gh-activity-graph-sh',
  },
  {
    name: 'email-verifier',
    description: 'Email verification service with MX, SPF, and DMARC record checking',
    technology: 'Go, gRPC',
    href: 'https://github.com/arcbjorn/email-verifier',
  },
  {
    name: 'number-base-converter-cli',
    description: 'CLI tool for converting numbers between different base systems (2-36) with fractional support',
    technology: 'Rust',
    href: 'https://github.com/arcbjorn/number-base-converter-cli',
  },
];

export default utils;
