'use client'
import { useState } from 'react'
import Link from 'next/link'

const monthlyData = [
  { month: 'Jan', interns: 20, completion: 75, attendance: 80 },
  { month: 'Feb', interns: 28, completion: 78, attendance: 82 },
  { month: 'Mar', interns: 35, completion: 82, attendance: 84 },
  { month: 'Apr', interns: 42, completion: 85, attendance: 86 },
  { month: 'May', interns: 47, completion: 88, attendance: 87 },
  { month: 'Jun', interns: 52, completion: 91, attendance: 89 },
]

const programData = [
  { name: 'AI Development', score: 92, interns: 12, color: 'bg-blue-500' },
  { name: 'Sales & Marketing', score: 78, interns: 8, color: 'bg-purple-500' },
  { name: 'Data Analytics', score: 85, interns: 15, color: 'bg-green-500' },
  { name: 'Product Management', score: 64, interns: 7, color: 'bg-yellow-500' },
]

const topInterns = [
  { name: 'Rahul Sharma', program: 'AI Development', score: 96, attendance: 92, tasks: 12 },
  { name: 'Priya Mehta', program: 'Data Analytics', score: 94, attendance: 88, tasks: 11 },
  { name: 'Arjun Kumar', program: 'AI Development', score: 91, attendance: 85, tasks: 10 },
  { name: 'Sneha Rao', program: 'Product Management', score: 88, attendance: 90, tasks: 9 },
  { name: 'Amit Patel', program: 'Sales & Marketing', score: 85, attendance: 87, tasks: 8 },
]

export default function AnalyticsPage() {
  const [activeMetric, setActiveMetric] = useState('completion')

  const maxValue = Math.max(...monthlyData.map(d => 
    activeMetric === 'interns' ? d.interns : 
    activeMetric === 'completion' ? d.completion : d.attendance
  ))

  return (
    <main className="min-h-screen bg-[#0f172a] p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/login" className="text-slate-400 text-sm hover:text-white">← Back to Login</Link>
          <h1 className="text-3xl font-bold text-white mt-2">Analytics & Reports</h1>
          <p className="text-slate-400">Marconpra · Program Performance Overview · March 2026</p>
        </div>
        <div className="bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs px-4 py-2 rounded-full">
          📊 Analytics View
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Interns', value: '47', change: '+12 vs last month', positive: true },
          { label: 'Avg Performance', value: '86%', change: '+4% vs last month', positive: true },
          { label: 'Avg Attendance', value: '84%', change: '+2% vs last month', positive: true },
          { label: 'At Risk Interns', value: '3', change: '-2 vs last month', positive: true },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">{kpi.label}</p>
            <p className="text-3xl font-bold text-white mb-1">{kpi.value}</p>
            <p className={`text-xs ${kpi.positive ? 'text-green-400' : 'text-red-400'}`}>
              {kpi.positive ? '↑' : '↓'} {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Bar Chart */}
        <div className="md:col-span-2 bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-lg">Monthly Trends</h2>
            <div className="flex gap-2">
              {[
                { key: 'completion', label: 'Completion %' },
                { key: 'attendance', label: 'Attendance %' },
                { key: 'interns', label: 'Interns' },
              ].map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => setActiveMetric(metric.key)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all ${
                    activeMetric === metric.key
                      ? 'bg-pink-600 text-white'
                      : 'bg-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-3 h-40">
            {monthlyData.map((d) => {
              const value = activeMetric === 'interns' ? d.interns :
                activeMetric === 'completion' ? d.completion : d.attendance
              const height = (value / maxValue) * 100
              return (
                <div key={d.month} className="flex flex-col items-center flex-1 gap-2">
                  <span className="text-white text-xs font-bold">{value}{activeMetric !== 'interns' ? '%' : ''}</span>
                  <div className="w-full flex items-end" style={{ height: '100px' }}>
                    <div
                      className="w-full bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-lg transition-all duration-500"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                  <span className="text-slate-400 text-xs">{d.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Program Distribution */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-6">Program Scores</h2>
          {programData.map((p) => (
            <div key={p.name} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-slate-300 text-sm">{p.name}</span>
                <span className="text-white font-bold text-sm">{p.score}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className={`${p.color} h-2 rounded-full`}
                  style={{ width: `${p.score}%` }}
                ></div>
              </div>
              <p className="text-slate-500 text-xs mt-1">{p.interns} interns</p>
            </div>
          ))}
        </div>

      </div>

      {/* Top Performers Table */}
      <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 mb-8">
        <h2 className="text-white font-bold text-lg mb-4">🏆 Top Performing Interns</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-slate-400 text-xs text-left pb-3 pr-4">Rank</th>
                <th className="text-slate-400 text-xs text-left pb-3 pr-4">Intern</th>
                <th className="text-slate-400 text-xs text-left pb-3 pr-4">Program</th>
                <th className="text-slate-400 text-xs text-left pb-3 pr-4">Score</th>
                <th className="text-slate-400 text-xs text-left pb-3 pr-4">Attendance</th>
                <th className="text-slate-400 text-xs text-left pb-3">Tasks Done</th>
              </tr>
            </thead>
            <tbody>
              {topInterns.map((intern, index) => (
                <tr key={intern.name} className="border-b border-slate-700/50">
                  <td className="py-3 pr-4">
                    <span className={`text-sm font-bold ${
                      index === 0 ? 'text-yellow-400' :
                      index === 1 ? 'text-slate-300' :
                      index === 2 ? 'text-orange-400' :
                      'text-slate-500'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="text-white text-sm font-medium">{intern.name}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="text-slate-400 text-sm">{intern.program}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-green-400 font-bold text-sm">{intern.score}%</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-blue-400 text-sm">{intern.attendance}%</span>
                  </td>
                  <td className="py-3">
                    <span className="text-slate-300 text-sm">{intern.tasks} tasks</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Button */}
      <div className="flex gap-4">
        <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-all">
          📥 Export PDF Report
        </button>
        <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-medium transition-all">
          📊 Export Excel
        </button>
        <Link href="/login">
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-medium transition-all">
            ← Back to Dashboard
          </button>
        </Link>
      </div>

    </main>
  )
}
