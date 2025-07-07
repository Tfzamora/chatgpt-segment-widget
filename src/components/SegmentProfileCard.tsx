'use client';

import React from 'react';

interface Props {
  content: string;
}

export default function SegmentProfileCard({ content }: Props) {
  // Break response into blocks based on double line breaks
  const sections = content.split('\n\n');

  return (
    <div className="space-y-6 text-gray-800 font-sans leading-relaxed">
      {sections.map((block, index) => {
        const trimmed = block.trim();

        // Render the title line (centered)
        if (trimmed.toLowerCase().includes('customer profile sample')) {
          return (
            <h2
              key={index}
              className="text-center text-2xl font-bold uppercase tracking-wide"
            >
              {trimmed.replace(/[#*]/g, '').trim()}
            </h2>
          );
        }

        // Render section headers (bold, block)
        if (
          trimmed.startsWith('**') &&
          trimmed.endsWith('**') &&
          trimmed.includes(':')
        ) {
          return (
            <h3 key={index} className="text-lg font-semibold border-b pb-1">
              {trimmed.replace(/\*\*/g, '').trim()}
            </h3>
          );
        }

        // Render value list
        if (trimmed.startsWith('1.')) {
          const lines = trimmed.split('\n').filter(Boolean);
          return (
            <ol key={index} className="list-decimal ml-6">
              {lines.map((line, i) => (
                <li key={i}>{line.replace(/^\d+\.\s*/, '').trim()}</li>
              ))}
            </ol>
          );
        }

        // Render arrows as bullet list
        if (trimmed.includes('→')) {
          const lines = trimmed
            .split('→')
            .filter((line) => line.trim().length > 0);
          return (
            <ul key={index} className="list-disc ml-6">
              {lines.map((line, i) => (
                <li key={i}>{line.trim()}</li>
              ))}
            </ul>
          );
        }

        // Default: render as paragraph
        return <p key={index}>{trimmed.replace(/[*#]/g, '').trim()}</p>;
      })}
    </div>
  );
}





