/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_FRONT_OFFICE: process.env.NEXT_PUBLIC_FRONT_OFFICE,
        NEXT_PUBLIC_HR_SERVICE: process.env.NEXT_PUBLIC_HR_SERVICE,
        NEXT_PUBLIC_CRM_SERVICE: process.env.NEXT_PUBLIC_CRM_SERVICE,
        NEXT_PUBLIC_HISTORY_SERVICE: process.env.NEXT_PUBLIC_HISTORY_SERVICE,
        NEXT_PUBLIC_KEY_CLOCK_CLIENT_ID:
            process.env.NEXT_PUBLIC_KEY_CLOCK_CLIENT_ID,
        NEXT_PUBLIC_KEY_CLOCK_CLIENT_SECRET:
            process.env.NEXT_PUBLIC_KEY_CLOCK_CLIENT_SECRET,
        NEXT_PUBLIC_KEY_CLOCK_URL: process.env.NEXT_PUBLIC_KEY_CLOCK_URL,
        NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
        NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
        NEXT_PUBLIC_FILE_VIEW: process.env.NEXT_PUBLIC_FILE_VIEW,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        domains: [
            "192.168.44.174",
            "dev-crm.zaytuntech.uz",
            "dev-internal-api.zaytuntech.uz",
        ],
    },
};

module.exports = nextConfig;
