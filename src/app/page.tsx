'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownOutput from '../components/MarkdownOutput';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🔍 result content being rendered:", result);
  }, [result]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    const res = await fetch('/api/segment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-50">
     
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-2xl p-6 space-y-4 border border-gray-200"
      >
        <input
          type="text"
          placeholder="Your Website Address"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border px-4 py-2 w-full outline-none"
          style={{
            borderColor: '#61615F',
            borderRadius: '0px',
          }}
          required
        />
       <button
  type="submit"
  className="w-full font-medium transition px-4 py-2 transform active:scale-95 active:bg-[#2F8991]"
  disabled={loading}
  style={{
    backgroundColor: '#3AA6B0',
    color: 'white',
    borderRadius: '0px',
  }}
>
  {loading ? 'Generating...' : 'Generate Profile'}
</button>


      </form>

      {result && (
 <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">

    <div className="bg-white w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] h-[80vh] p-6 rounded-xl shadow-lg relative border border-gray-300 overflow-y-auto">

      <button
  onClick={() => setResult('')}
  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold transition transform active:scale-95"
  aria-label="Close"
>
  ×
</button>

      <MarkdownOutput content={result} />
    </div>
  </div>
)}

    </div>
  );
}




