/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: 'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large',
        HF_TOKEN: 'PLACE YOUR HUGGINGFACE BEARER TOKEN HERE',
        DOCQAMODEL_API_URL: 'https://api-inference.huggingface.co/models/impira/layoutlm-document-qa'
    },
};

export default nextConfig;
