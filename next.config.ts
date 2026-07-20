import type { NextConfig } from "next";

// Content-Security-Policy allowing the PayPal JS SDK (script + buttons +
// checkout iframe/popup) and this site's own same-origin assets.
//
// Note on 'unsafe-inline': this app renders JSON-LD structured data and
// relies on Framer Motion / React setting inline styles, so script-src and
// style-src keep 'unsafe-inline' rather than risk breaking those at runtime.
// The real hardening value here is restricting which *origins* scripts,
// frames, and network requests can reach — that stops the common XSS goal of
// exfiltrating data or loading a spoofed payment UI from an attacker-controlled
// domain, even with inline scripts allowed. A stricter nonce-based CSP is a
// reasonable follow-up if this is ever tightened further.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.paypal.com https://www.paypalobjects.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.paypalobjects.com https://www.paypal.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.paypal.com https://www.paypalobjects.com https://api-m.paypal.com https://api-m.sandbox.paypal.com",
  "frame-src https://www.paypal.com https://www.sandbox.paypal.com",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
