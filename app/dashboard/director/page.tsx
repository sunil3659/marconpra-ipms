'use client'
import { useState } from 'react'
import Link from 'next/link'

const programs = [
  { name: 'AI Development Batch 1', interns: 12, completion: 92, health: 'Excellent', color: 'green' },
  { name: 'Sales & Marketing Interns', interns: 8, completion: 78, health: 'Good', color: 'blue' },
  { name: 'Data Analytics Program', interns: 15, completion: 85, health: 'Good', color: 'purple' },
  { name: 'Product Management Batch', interns: 7, completion: 64, health: 'Needs Attention', color: 'yellow' },
]

const milestones = [
  { title: 'Week 4 Review', date: 'Mar 30', status: 'Due Soon', color: 'yellow' },
  { title: 'Mid-term Evaluation', date: 'Apr 1', status: 'Upcoming', color: 'blue' },
  { title: 'Project Submissions', date: 'Apr 15', status: 'Upcoming', color: 'blue' },
  { title: 'Final Presentation', date: 'Apr 30', status: 'Upcoming', color: 'purple' },
]

export default function DirectorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <main className="min-h-screen bg-[#0f172a] p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/" className="text-slate-400 text-sm hover:text-white">← Back to Home</Link>
          <h1 className="text-3xl font-bold text-white mt-2">Program Director Dashboard</h1>
          <p className="text-slate-400">Marconpra · Managing 4 Programs · 42 Active Interns</p>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs px-4 py-2 rounded-full">
          🎯 Director View
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Programs', value: '4', sub: '1 needs attention', color: 'text-orange-400' },
          { label: 'Total Interns', value: '42', sub: '+5 this week', color: 'text-blue-400' },
          { label: 'Avg Program Health', value: '80%', sub: 'Above target', color: 'text-green-400' },
          { label: 'Milestones Due', value: '2', sub: 'This week', color: 'text-yellow-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</p>
            <p className="text-slate-500 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['overview', 'milestones', 'cohorts'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-orange-600 text-white'
                : 'bg-[#1e293b] text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'overview' ? '📊 Overview' : tab === 'milestones' ? '🎯 Milestones' : '👥 Cohorts'}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program) => (
            <div key={program.name} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-bold">{program.name}</h3>
                  <p className="text-slate-400 text-sm">{program.interns} interns enrolled</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  program.color === 'green' ? 'bg-green-500/20 text-green-400' :
                  program.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                  program.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {program.health}
                </span>
              </div>
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400 text-sm">Completion Rate</span>
                  <span className="text-white font-bold text-sm">{program.completion}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      program.color === 'green' ? 'bg-green-500' :
                      program.color === 'blue' ? 'bg-blue-500' :
                      program.color === 'purple' ? 'bg-purple-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${program.completion}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-xs">
                  View Interns
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-xs">
                  View Tasks
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-lg text-xs">
                  Manage Program
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Milestones Tab */}
      {activeTab === 'milestones' && (
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">Program Milestones</h2>
          {milestones.map((m) => (
            <div key={m.title} className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl mb-3">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  m.color === 'yellow' ? 'bg-yellow-400' :
                  m.color === 'blue' ? 'bg-blue-400' :
                  'bg-purple-400'
                }`}></div>
                <div>
                  <p className="text-white font-medium">{m.title}</p>
                  <p className="text-slate-400 text-xs">Due: {m.date}</p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${
                m.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                m.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                {m.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Cohorts Tab */}
      {activeTab === 'cohorts' && (
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">Cohort Management</h2>
          {[
            { name: 'Batch 1', start: 'Mar 1', end: 'Apr 30', interns: 12, status: 'Active' },
            { name: 'Batch 2', start: 'Apr 1', end: 'May 31', interns: 8, status: 'Enrolling' },
            { name: 'Batch 3', start: 'May 1', end: 'Jun 30', interns: 0, status: 'Planning' },
          ].map((cohort) => (
            <div key={cohort.name} className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl mb-3">
              <div>
                <p className="text-white font-bold">{cohort.name}</p>
                <p className="text-slate-400 text-xs">{cohort.start} → {cohort.end}</p>
                <p className="text-slate-500 text-xs">{cohort.interns} interns</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full ${
                  cohort.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  cohort.status === 'Enrolling' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {cohort.status}
                </span>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-lg text-xs">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </main>
  )
}