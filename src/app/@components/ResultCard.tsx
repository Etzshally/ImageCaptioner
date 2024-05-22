"use client"
import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface ResultCardProps {
  code: any;
  language: any;
}

const ResultCard: React.FC<ResultCardProps> = ({ code, language }) => {
  return (
    <>
      <div className="text-start">
        <SyntaxHighlighter language={language} style={atomOneDark}>
          {code}
        </SyntaxHighlighter>
      </div>
    </>
  );
};
export default ResultCard