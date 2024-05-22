"use client"
import React, { useState } from "react";
import Switcher from "./@components/ui/Switch";
import ImageCaptioner from "./@components/ImageCaptioner"
import DocExplainer from "./@components/DocExplainer";

export default function Home() {
  const [ModelDisplay, setModelDisplay] = useState("model_img");

  const handleModelDisplay = (data: string) => {
    if (data === "model_img") {
      setModelDisplay("model_img")
    }
    else if (data === "model_doc") {
      setModelDisplay("model_doc")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-24">
      <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center">

        <Switcher model_mode={handleModelDisplay} />

        {ModelDisplay === "model_img" && (
          <ImageCaptioner />
        )}

        {ModelDisplay === "model_doc" && (
          <DocExplainer />
        )}

      </div>
    </main>
  );
}
