'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function CEODashboard() {
  const [aiSummary, setAiSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const generateSummary = async () => {
    setLoading(true)
    setAiSummary('')
    try {
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'ceo_summary',
          data: {
            totalInterns: 47,
            activePrograms: 4,
            avgAttendance: 84,
            avgPerformance: 78,
            completionRate: 91,
            topPerformers: ['Rahul S', 'Priya M', 'Arjun K'],
            atRiskInterns: ['Vivek T', 'Sneha R'],
          }
        })
      })
      const result = await response.json()
      setAiSummary(result.summary)
    } catch (_error) {
      setAiSummary('Error generating summary. Please try again.')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0f172a] p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/login" className="text-slate-400 text-sm hover:text-white">← Back to Login</Link>
          <h1 className="text-3xl font-bold text-white mt-2">CEO Executive Dashboard</h1>
          <p className="text-slate-400">Marconpra · AI Products Division · Live Overview</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs px-4 py-2 rounded-full">
          👔 CEO View
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {[
          { href: '/dashboard/ceo', label: '👔 CEO', active: true },
          { href: '/dashboard/director', label: '🎯 Director', active: false },
          { href: '/dashboard/mentor', label: '👨‍🏫 Mentor', active: false },
          { href: '/dashboard/intern', label: '🎓 Intern', active: false },
          { href: '/analytics', label: '📊 Analytics', active: false },
          { href: '/tasks', label: '📋 Tasks', active: false },
          { href: '/notifications', label: '🔔 Notifications', active: false },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <div className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              item.active
                ? 'bg-blue-600 text-white'
                : 'bg-[#1e293b] text-slate-400 hover:text-white border border-slate-700'
            }`}>
              {item.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Interns', value: '47', change: '+12 this month', color: 'blue' },
          { label: 'Active Programs', value: '4', change: '2 completing soon', color: 'purple' },
          { label: 'Avg Attendance', value: '84%', change: 'Above 75% threshold', color: 'green' },
          { label: 'Completion Rate', value: '91%', change: 'Highest ever', color: 'yellow' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-green-400 text-xs">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        {/* Program Health */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">Program Health Scores</h2>
          {[
            { name: 'AI Development Batch 1', score: 92, color: 'bg-green-500' },
            { name: 'Sales & Marketing Interns', score: 78, color: 'bg-blue-500' },
            { name: 'Data Analytics Program', score: 85, color: 'bg-purple-500' },
            { name: 'Product Management Batch', score: 64, color: 'bg-yellow-500' },
          ].map((program) => (
            <div key={program.name} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-slate-300 text-sm">{program.name}</span>
                <span className="text-white font-bold text-sm">{program.score}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className={`${program.color} h-2 rounded-full`} style={{ width: `${program.score}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Performers & At Risk */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">🏆 Top Performers</h2>
            {['Rahul Sharma — Score: 96%', 'Priya Mehta — Score: 94%', 'Arjun Kumar — Score: 91%'].map((intern) => (
              <div key={intern} className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-slate-300 text-sm">{intern}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#1e293b] border border-red-900/50 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">⚠️ At Risk Interns</h2>
            {['Vivek Tomar — Attendance: 68%', 'Sneha Rao — Tasks: 3 overdue'].map((intern) => (
              <div key={intern} className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-slate-300 text-sm">{intern}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Summary Section */}
      <div className="bg-[#1e293b] border border-pink-900/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-bold text-lg">🤖 AI Executive Summary</h2>
            <p className="text-slate-400 text-sm">Generated by AI — Click to generate live</p>
          </div>
          <button
            onClick={generateSummary}
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-900 text-white px-6 py-3 rounded-xl font-medium transition-all"
          >
            {loading ? '⏳ Generating...' : '✨ Generate AI Summary'}
          </button>
        </div>
        {aiSummary && (
          <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-5">
            <p className="text-slate-300 leading-relaxed">{aiSummary}</p>
          </div>
        )}
        {!aiSummary && !loading && (
          <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-5 text-center">
            <p className="text-slate-500">Click the button above to generate a live AI executive summary</p>
          </div>
        )}
      </div>

    </main>
  )
}
