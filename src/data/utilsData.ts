type UtilEntry = {
  name: string;
  description: string;
  technology: string;
  href: string;
  status: 'active' | 'experimental' | 'archived';
};

const utils: UtilEntry[] = [
  {
    name: 'CSS Grid Generator',
    description: 'Interactive tool for creating CSS Grid layouts',
    technology: 'React',
    href: 'https://example.com/css-grid-tool',
    status: 'active',
  },
  {
    name: 'Color Palette Extractor',
    description: 'Extract color palettes from images using ML',
    technology: 'Python',
    href: 'https://example.com/color-extractor',
    status: 'experimental',
  },
  {
    name: 'Regex Playground',
    description: 'Test and visualize regular expressions',
    technology: 'Vanilla JS',
    href: 'https://example.com/regex-playground',
    status: 'active',
  },
  {
    name: 'JSON Schema Validator',
    description: 'Validate JSON against schemas',
    technology: 'Node.js',
    href: 'https://example.com/json-validator',
    status: 'archived',
  },
  {
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode base64 strings',
    technology: 'Go',
    href: 'https://example.com/base64-tool',
    status: 'active',
  },
  {
    name: 'QR Code Generator',
    description: 'Generate QR codes with custom styling options',
    technology: 'TypeScript',
    href: 'https://example.com/qr-generator',
    status: 'active',
  },
  {
    name: 'Password Generator',
    description: 'Secure password generator with entropy visualization',
    technology: 'Rust',
    href: 'https://example.com/password-gen',
    status: 'active',
  },
  {
    name: 'Hash Calculator',
    description: 'Calculate MD5, SHA-1, SHA-256 hashes for text and files',
    technology: 'WebAssembly',
    href: 'https://example.com/hash-calc',
    status: 'active',
  },
  {
    name: 'Image Optimizer',
    description: 'Compress and optimize images with quality controls',
    technology: 'Next.js',
    href: 'https://example.com/image-opt',
    status: 'experimental',
  },
  {
    name: 'JWT Debugger',
    description: 'Decode, verify and debug JSON Web Tokens',
    technology: 'Vue.js',
    href: 'https://example.com/jwt-debug',
    status: 'active',
  },
  {
    name: 'API Tester',
    description: 'Test REST APIs with custom headers and payloads',
    technology: 'Svelte',
    href: 'https://example.com/api-test',
    status: 'active',
  },
  {
    name: 'Markdown Previewer',
    description: 'Real-time markdown editor with live preview',
    technology: 'SolidJS',
    href: 'https://example.com/md-preview',
    status: 'active',
  },
];

export default utils;