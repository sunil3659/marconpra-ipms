'use client'
import { useState } from 'react'
import Link from 'next/link'

const tasks = [
  { title: 'Research AI Model Architectures', due: 'Mar 30', priority: 'High', status: 'In Progress', category: 'Research' },
  { title: 'Build Data Preprocessing Pipeline', due: 'Apr 2', priority: 'High', status: 'To Do', category: 'Technical' },
  { title: 'Weekly Progress Report', due: 'Mar 29', priority: 'Medium', status: 'Under Review', category: 'Administrative' },
  { title: 'Attend Mentor Session', due: 'Mar 28', priority: 'Low', status: 'Completed', category: 'Other' },
  { title: 'Document API Integration', due: 'Apr 5', priority: 'Medium', status: 'To Do', category: 'Technical' },
]

const attendance = [
  { day: 'Mon', status: 'Present' },
  { day: 'Tue', status: 'Present' },
  { day: 'Wed', status: 'Work from Home' },
  { day: 'Thu', status: 'Present' },
  { day: 'Fri', status: 'Absent' },
  { day: 'Mon', status: 'Present' },
  { day: 'Tue', status: 'Present' },
  { day: 'Wed', status: 'Present' },
  { day: 'Thu', status: 'Leave' },
  { day: 'Fri', status: 'Present' },
]

export default function InternDashboard() {
  const [activeTab, setActiveTab] = useState('tasks')

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'bg-green-500/20 text-green-400'
    if (status === 'In Progress') return 'bg-blue-500/20 text-blue-400'
    if (status === 'Under Review') return 'bg-yellow-500/20 text-yellow-400'
    return 'bg-slate-500/20 text-slate-400'
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'text-red-400'
    if (priority === 'Medium') return 'text-yellow-400'
    return 'text-green-400'
  }

  const getAttendanceColor = (status: string) => {
    if (status === 'Present') return 'bg-green-500'
    if (status === 'Absent') return 'bg-red-500'
    if (status === 'Work from Home') return 'bg-blue-500'
    return 'bg-yellow-500'
  }

  return (
    <main className="min-h-screen bg-[#0f172a] p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/login" className="text-slate-400 text-sm hover:text-white">← Back to Login</Link>
          <h1 className="text-3xl font-bold text-white mt-2">Intern Dashboard</h1>
          <p className="text-slate-400">Welcome back, Rahul Sharma · AI Development Batch 1</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-4 py-2 rounded-full">
          🎓 Intern View
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {[
          { href: '/dashboard/ceo', label: '👔 CEO', active: false },
          { href: '/dashboard/director', label: '🎯 Director', active: false },
          { href: '/dashboard/mentor', label: '👨‍🏫 Mentor', active: false },
          { href: '/dashboard/intern', label: '🎓 Intern', active: true },
          { href: '/analytics', label: '📊 Analytics', active: false },
          { href: '/tasks', label: '📋 Tasks', active: false },
          { href: '/notifications', label: '🔔 Notifications', active: false },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <div className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              item.active
                ? 'bg-green-600 text-white'
                : 'bg-[#1e293b] text-slate-400 hover:text-white border border-slate-700'
            }`}>
              {item.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Attendance Rate', value: '92%', sub: 'Above 75% threshold ✅', color: 'text-green-400' },
          { label: 'Tasks Completed', value: '8/12', sub: '4 remaining this week', color: 'text-blue-400' },
          { label: 'Performance Score', value: '96%', sub: 'Top performer 🏆', color: 'text-yellow-400' },
          { label: 'Days Remaining', value: '24', sub: 'Program ends Apr 30', color: 'text-purple-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#1e293b] border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</p>
            <p className="text-slate-500 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Program Progress */}
      <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6 mb-6">
        <div className="flex justify-between mb-3">
          <h2 className="text-white font-bold text-lg">Program Progress</h2>
          <span className="text-slate-400 text-sm">Week 6 of 12</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{ width: '50%' }}></div>
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>🚀 Program Start</span>
          <span>📋 Mid-term Review — Apr 1</span>
          <span>🎓 Final Presentation — Apr 30</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['tasks', 'attendance', 'evaluations'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-green-600 text-white'
                : 'bg-[#1e293b] text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'tasks' ? '📋 Tasks' : tab === 'attendance' ? '📅 Attendance' : '⭐ Evaluations'}
          </button>
        ))}
      </div>

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">My Tasks</h2>
          {tasks.map((task) => (
            <div key={task.title} className="flex items-center justify-between p-4 bg-[#0f172a] rounded-xl mb-3">
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{task.title}</p>
                <div className="flex gap-3 mt-1">
                  <span className="text-slate-500 text-xs">Due: {task.due}</span>
                  <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>● {task.priority}</span>
                  <span className="text-slate-500 text-xs">{task.category}</span>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ml-4 ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-white font-bold text-lg">Attendance Record</h2>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span> Present</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span> Absent</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span> WFH</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span> Leave</span>
            </div>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {attendance.map((a, i) => (
              <div key={i} className="text-center">
                <div className={`w-10 h-10 rounded-full ${getAttendanceColor(a.status)} mx-auto mb-1 flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{a.day[0]}</span>
                </div>
                <p className="text-slate-500 text-xs">{a.day}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-[#0f172a] rounded-xl p-4">
            <div className="flex justify-between">
              <span className="text-slate-400 text-sm">Overall Attendance Rate</span>
              <span className="text-green-400 font-bold">92% ✅</span>
            </div>
            <p className="text-slate-500 text-xs mt-1">Above the 75% minimum threshold — eligible for certificate</p>
          </div>
        </div>
      )}

      {/* Evaluations Tab */}
      {activeTab === 'evaluations' && (
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">My Evaluations</h2>
          {[
            { cycle: 'Week 2 Check-in', mentor: 'Dr. Sharma', date: 'Mar 15', technical: 7, communication: 8, teamwork: 9, overall: 80 },
            { cycle: 'Week 4 Review', mentor: 'Dr. Sharma', date: 'Mar 22', technical: 8, communication: 8, teamwork: 9, overall: 88 },
          ].map((ev) => (
            <div key={ev.cycle} className="bg-[#0f172a] rounded-xl p-5 mb-4">
              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-white font-bold">{ev.cycle}</p>
                  <p className="text-slate-400 text-xs">By {ev.mentor} · {ev.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">{ev.overall}%</p>
                  <p className="text-slate-500 text-xs">Overall Score</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Technical', score: ev.technical },
                  { label: 'Communication', score: ev.communication },
                  { label: 'Teamwork', score: ev.teamwork },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-400 text-xs">{s.label}</span>
                      <span className="text-white text-xs font-bold">{s.score}/10</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${s.score * 10}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </main>
  )
}