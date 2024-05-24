"use client"
import React, { useState } from 'react'
import Image from "next/image";
import ResultCard from "./ResultCard";

const DocExplainer = () => {
    const [SelectedFile, setSelectedFile] = useState("");
    const [Result, setResult] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [base64String, setBase64String] = useState<string | null>(null);
    const [Question, setQuestion] = useState("");

    const handleFileChange = (event: any) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file)
            setPreviewUrl(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setBase64String(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileUpload = async () => {
        if (!SelectedFile) {
            alert('Please select a file first.');
            return;
        }
        else {
            setUploading(true);
            GetResFromModel(base64String)
        }
    }

    const GetResFromModel = async (imageFile: any) => {
        try {
            if (!SelectedFile) {
                alert('Please select a file first.');
                return;
            }

            const payload = {
                inputs: {
                    image: base64String,
                    question: Question,
                },
            };

            const response = await fetch(
                `${process.env.DOCQAMODEL_API_URL}`,
                {
                    headers: {
                        Authorization: `${process.env.HF_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify(payload),
                }
            );
            if (!response.ok) {
                alert(`HTTP error! status: ${response.status}`);
                setUploading(false);
            }
            setUploading(false)
            const result = await response.json();
            setResult(result);
        } catch (error: any) {
            alert(error.message)
            setUploading(false)
        }
    }

    return (
        <>
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-2 p-2 border border-gray-300 rounded"
            />

            {previewUrl && (
                <Image src={URL.createObjectURL(previewUrl)} alt="Preview" className="mt-[10px] mb-[20px] rounded-md shadow-md" width={200} height={200} />
            )}

            <input value={Question} onChange={(e) => setQuestion(e.target.value)} type='text' placeholder='Ask any query you have regarding document' className='p-2 w-full border-[2px] rounded-md border-black outline-none mt-2 mb-2' />

            {base64String && (
                <div>
                    <h2>Base64 Encoded String:</h2>
                    <textarea value={base64String} readOnly rows={10} cols={50}></textarea>
                </div>
            )}

            <button
                onClick={handleFileUpload}
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                disabled={uploading}
            >
                {uploading ? (
                    <div className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Asking...
                    </div>
                ) : (
                    'Ask!'
                )}
            </button>

            {Result && (
                <div className="w-full flex flex-col justify-center mt-2 mb-2 items-center">
                    <ResultCard code={JSON.stringify(Result)} language={'json'} />
                </div>
            )}
        </>
    )
}

export default DocExplainer