"use client"
import React, { useState } from "react";
import Image from "next/image";
import ResultCard from "./@components/ResultCard";

export default function Home() {
  const [SelectedFile, setSelectedFile] = useState("");
  const [Result, setResult] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(file)
    }
  };

  const handleFileUpload = async () => {
    if (!SelectedFile) {
      alert('Please select a file first.');
      return;
    }
    else {
      setUploading(true);
      GetResFromModel(SelectedFile)
    }
  }

  const GetResFromModel = async (imageFile: any) => {
    try {
      if (!SelectedFile) {
        alert('Please select a file first.');
        return;
      }
      const response = await fetch(
        `${process.env.API_URL}`,
        {
          headers: {
            Authorization: `${process.env.HF_TOKEN}`,
          },
          method: "POST",
          body: SelectedFile,
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-24">
      <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center">

        <input
          type="file"
          onChange={handleFileChange}
          className="mb-2 p-2 border border-gray-300 rounded"
        />

        {previewUrl && (
          <Image src={URL.createObjectURL(previewUrl)} alt="Preview" className="mt-[10px] mb-[20px] rounded-md shadow-md" width={200} height={200} />
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
              Uploading...
            </div>
          ) : (
            'Get Image Details'
          )}
        </button>

        {Result && (
          <div className="w-full flex flex-col justify-center mt-2 mb-2 items-center">
            <ResultCard code={JSON.stringify(Result)} language={'json'} />
          </div>
        )}

      </div>
    </main>
  );
}
