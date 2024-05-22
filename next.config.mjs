/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: 'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
        HF_TOKEN: 'Bearer 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',
        DOCQAMODEL_API_URL: 'https://api-inference.huggingface.co/models/impira/layoutlm-document-qa'
    },
};

export default nextConfig;
