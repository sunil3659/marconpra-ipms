import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    // Debug - check if API key is being read
    const apiKey = process.env.GEMINI_API_KEY
    console.log('API Key found:', apiKey ? 'YES - length: ' + apiKey.length : 'NO - UNDEFINED')

    if (!apiKey) {
      return NextResponse.json({ 
        summary: 'API Key not found. Check .env.local file.' 
      })
    }

    let prompt = `You are an AI assistant for Marconpra, a sales and marketing company building 6 AI products. 
      
Write a professional executive summary for the CEO based on this internship program data:
- Total Interns: 47
- Active Programs: 4
- Average Attendance: 84%
- Average Performance Score: 78%
- Program Completion Rate: 91%
- Top Performers: Rahul S, Priya M, Arjun K
- At Risk Interns: Vivek T, Sneha R

Write 3-4 sentences. Be professional, insightful and actionable. Mention specific numbers.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )

    const result = await response.json()
    console.log('Gemini response:', JSON.stringify(result))

    if (result.error) {
      return NextResponse.json({ 
        summary: `Gemini Error: ${result.error.message}` 
      })
    }

    const summary = result.candidates[0].content.parts[0].text
    return NextResponse.json({ summary })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ 
      summary: `Error: ${error}` 
    })
  }
}