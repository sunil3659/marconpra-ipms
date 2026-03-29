'use client'
import { useState } from 'react'
import Link from 'next/link'

const interns = [
  { name: 'Rahul Sharma', task: 'AI Model Research', attendance: 92, score: 96, status: 'On Track', risk: 'low' },
  { name: 'Priya Mehta', task: 'Data Pipeline Build', attendance: 88, score: 94, status: 'On Track', risk: 'low' },
  { name: 'Arjun Kumar', task: 'API Integration', attendance: 85, score: 91, status: 'On Track', risk: 'low' },
  { name: 'Vivek Tomar', task: 'Frontend Dashboard', attendance: 68, score: 72, status: 'At Risk', risk: 'high' },
  { name: 'Sneha Rao', task: 'Database Design', attendance: 74, score: 78, status: 'Warning', risk: 'medium' },
]

export default function MentorDashboard() {
  const [selectedIntern, setSelectedIntern] = useState(interns[0])
  const [narrative, setNarrative] = useState('')
  const [loading, setLoading] = useState(false)
  const [scores, setScores] = useState({
    technical: 8, communication: 7, problemSolving: 8, teamwork: 9
  })

  const generateNarrative = async () => {
    setLoading(true)
    setNarrative('')
    try {
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'evaluation_narrative',
          data: {
            internName: selectedIntern.name,
            technical: scores.technical,
            communication: scores.communication,
            problemSolving: scores.problemSolving,
            teamwork: scores.teamwork,
            attendance: selectedIntern.attendance,
          }
        })
      })
      const result = await response.json()
      setNarrative(result.summary)
    } catch (_error) {
      setNarrative('Error generating narrative. Please try again.')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0f172a] p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/" className="text-slate-400 text-sm hover:text-white">← Back to Home</Link>
          <h1 className="text-3xl font-bold text-white mt-2">Mentor Dashboard</h1>
          <p className="text-slate-400">Marconpra · Managing 5 Interns · AI Evaluation Tools</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs px-4 py-2 rounded-full">
          👨‍🏫 Mentor View
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'My Interns', value: '5', sub: 'Active this program' },
          { label: 'Avg Performance', value: '86%', sub: 'Across all interns' },
          { label: 'Evaluations Due', value: '2', sub: 'Submit by Friday' },
          { label: 'Tasks Pending Review', value: '7', sub: 'Awaiting approval' },
        ].map((s) => (
          <div key={s.label} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-white mb-1">{s.value}</p>
            <p className="text-slate-500 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Intern List */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">My Interns</h2>
          {interns.map((intern) => (
            <div
              key={intern.name}
              onClick={() => { setSelectedIntern(intern); setNarrative('') }}
              className={`p-3 rounded-xl mb-2 cursor-pointer transition-all ${
                selectedIntern.name === intern.name
                  ? 'bg-purple-500/20 border border-purple-500/50'
                  : 'hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-sm">{intern.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  intern.risk === 'low' ? 'bg-green-500/20 text-green-400' :
                  intern.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {intern.status}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-1">{intern.task}</p>
              <p className="text-slate-500 text-xs">Attendance: {intern.attendance}%</p>
            </div>
          ))}
        </div>

        {/* Evaluation Panel */}
        <div className="md:col-span-2 flex flex-col gap-6">

          {/* Selected Intern Info */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">
              Evaluating: {selectedIntern.name}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {Object.entries(scores).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-white font-bold text-sm">{value}/10</span>
                  </div>
                  <input
                    type="range" min="1" max="10" value={value}
                    onChange={(e) => setScores({...scores, [key]: parseInt(e.target.value)})}
                    className="w-full accent-purple-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Attendance: <span className={`font-bold ${selectedIntern.attendance < 75 ? 'text-red-400' : 'text-green-400'}`}>{selectedIntern.attendance}%</span></p>
                {selectedIntern.attendance < 75 && (
                  <p className="text-red-400 text-xs mt-1">⚠️ Below 75% threshold — ineligible for certificate</p>
                )}
              </div>
              <button
                onClick={generateNarrative}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 text-white px-6 py-3 rounded-xl font-medium transition-all"
              >
                {loading ? '⏳ Generating...' : '🤖 Generate AI Narrative'}
              </button>
            </div>
          </div>

          {/* AI Narrative Output */}
          <div className="bg-[#1e293b] border border-purple-900/50 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-3">🤖 AI Evaluation Narrative</h2>
            {narrative ? (
              <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-5">
                <p className="text-slate-300 leading-relaxed">{narrative}</p>
                <div className="mt-4 flex gap-3">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                    ✅ Approve & Submit
                  </button>
                  <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm">
                    ✏️ Edit Narrative
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-5 text-center">
                <p className="text-slate-500">Select an intern, adjust scores and click Generate AI Narrative</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}
