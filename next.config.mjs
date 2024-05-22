/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: 'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
        HF_TOKEN: 'Bearer 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'
    },
};

export default nextConfig;
