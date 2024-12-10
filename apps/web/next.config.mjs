/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@cloudmatize/ts-utils"],
  i18n: {
    locales: ['en-US', 'pt-BR'],
    defaultLocale: 'pt-BR',
  }
};

export default nextConfig