'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
}

const MarkdownOutput: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose max-w-none
      prose-h1:mt-10 prose-h1:mb-4
      prose-h2:mt-8 prose-h2:mb-4
      prose-h3:mt-6 prose-h3:mb-3
      prose-p:my-4
      prose-ul:my-4 prose-ol:my-4
      prose-strong:font-semibold
      prose-li:mt-2"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownOutput;


