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
];

export default utils;
