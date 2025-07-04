// app/api/segment/route.ts
import { basePrompt } from '@/lib/prompt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json(
      { error: 'Missing URL' },
      {
        status: 400,
        headers: corsHeaders(),
      }
    );
  }

  const prompt = basePrompt.replace('{url}', url);


try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || 'OpenAI request failed' },
        {
          status: 500,
          headers: corsHeaders(),
        }
      );
    }

    const result = data?.choices?.[0]?.message?.content || 'No response received.';

    return NextResponse.json(
      { result },
      {
        headers: corsHeaders(),
      }
    );
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

// Handle preflight CORS requests
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

// Reusable CORS headers
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}