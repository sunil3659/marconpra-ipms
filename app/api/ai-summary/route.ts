import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const type = body.type
    const data = body.data

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        summary: 'API Key not found. Check .env.local file.'
      })
    }

    let prompt = ''

    if (type === 'ceo_summary') {
      prompt = `You are an AI assistant for Marconpra, a sales and marketing company building 6 AI products. 
      
Write a professional executive summary for the CEO based on this internship program data:
- Total Interns: ${data.totalInterns}
- Active Programs: ${data.activePrograms}
- Average Attendance: ${data.avgAttendance}%
- Average Performance Score: ${data.avgPerformance}%
- Program Completion Rate: ${data.completionRate}%
- Top Performers: ${data.topPerformers.join(', ')}
- At Risk Interns: ${data.atRiskInterns.join(', ')}

Write 3-4 sentences. Be professional, insightful and actionable. Mention specific numbers.`
    }

    if (type === 'evaluation_narrative') {
      prompt = `You are an AI mentor assistant at Marconpra.

Write a professional performance evaluation narrative for intern ${data.internName} based on these scores:
- Technical Skills: ${data.technical}/10
- Communication: ${data.communication}/10
- Problem Solving: ${data.problemSolving}/10
- Teamwork: ${data.teamwork}/10
- Attendance: ${data.attendance}%

Write 3-4 sentences. Be constructive, specific and encouraging. Mention strengths and one area to improve.`
    }

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

    if (result.error) {
      return NextResponse.json({
        summary: `Gemini Error: ${result.error.message}`
      })
    }

    const summary = result.candidates[0].content.parts[0].text
    return NextResponse.json({ summary })

  } catch (_error) {
    return NextResponse.json({
      summary: 'Error generating AI response. Please try again.'
    })
  }
}