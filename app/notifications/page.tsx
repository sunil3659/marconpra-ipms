'use client'
import { useState } from 'react'
import Link from 'next/link'

const initialNotifications = [
  {
    id: 1,
    type: 'evaluation',
    title: 'Evaluation Due Tomorrow',
    message: 'You have a pending evaluation for Rahul Sharma due on Mar 30.',
    time: '2 mins ago',
    read: false,
    icon: '⭐',
    color: 'border-yellow-500',
  },
  {
    id: 2,
    type: 'attendance',
    title: 'Attendance Alert — At Risk',
    message: 'Vivek Tomar attendance has dropped to 68% — below the 75% threshold.',
    time: '15 mins ago',
    read: false,
    icon: '⚠️',
    color: 'border-red-500',
  },
  {
    id: 3,
    type: 'task',
    title: 'Task Submitted for Review',
    message: 'Priya Mehta submitted Weekly Progress Report for your review.',
    time: '1 hour ago',
    read: false,
    icon: '📋',
    color: 'border-blue-500',
  },
  {
    id: 4,
    type: 'milestone',
    title: 'Milestone Due in 7 Days',
    message: 'Week 4 Review milestone is due on Mar 30 for AI Development Batch 1.',
    time: '2 hours ago',
    read: true,
    icon: '🎯',
    color: 'border-purple-500',
  },
  {
    id: 5,
    type: 'program',
    title: 'New Intern Enrolled',
    message: 'Amit Patel has been enrolled in Sales & Marketing Interns program.',
    time: '3 hours ago',
    read: true,
    icon: '🎓',
    color: 'border-green-500',
  },
  {
    id: 6,
    type: 'evaluation',
    title: 'Evaluation Submitted',
    message: 'Dr. Sharma submitted evaluation for Arjun Kumar — Score: 91%.',
    time: '5 hours ago',
    read: true,
    icon: '✅',
    color: 'border-green-500',
  },
  {
    id: 7,
    type: 'task',
    title: 'Task Rejected',
    message: 'Market Research Analysis submitted by Amit Patel was rejected with comments.',
    time: '1 day ago',
    read: true,
    icon: '❌',
    color: 'border-red-500',
  },
  {
    id: 8,
    type: 'milestone',
    title: 'Milestone Completed',
    message: 'Week 2 Check-in milestone completed successfully for all cohorts.',
    time: '2 days ago',
    read: true,
    icon: '🏆',
    color: 'border-yellow-500',
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState('all')

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'evaluation') return n.type === 'evaluation'
    if (filter === 'task') return n.type === 'task'
    if (filter === 'attendance') return n.type === 'attendance'
    if (filter === 'milestone') return n.type === 'milestone'
    return true
  })

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  return (
    <main className="min-h-screen bg-[#0f172a] p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/login" className="text-slate-400 text-sm hover:text-white">← Back to Login</Link>
          <h1 className="text-3xl font-bold text-white mt-2">Notifications</h1>
          <p className="text-slate-400">Marconpra IPMS · Stay updated on all activities</p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
              {unreadCount} unread
            </span>
          )}
          <button
            onClick={markAllRead}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-sm transition-all"
          >
            ✓ Mark All Read
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'all', label: '🔔 All' },
          { key: 'unread', label: '🔴 Unread' },
          { key: 'evaluation', label: '⭐ Evaluations' },
          { key: 'task', label: '📋 Tasks' },
          { key: 'attendance', label: '⚠️ Attendance' },
          { key: 'milestone', label: '🎯 Milestones' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f.key
                ? 'bg-blue-600 text-white'
                : 'bg-[#1e293b] text-slate-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 && (
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8 text-center">
            <p className="text-slate-400 text-lg">🎉 All caught up!</p>
            <p className="text-slate-500 text-sm mt-1">No notifications in this category</p>
          </div>
        )}
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markRead(notification.id)}
            className={`bg-[#1e293b] border-l-4 ${notification.color} rounded-2xl p-5 cursor-pointer transition-all hover:bg-[#253148] ${
              !notification.read ? 'border-r border-t border-b border-slate-600' : 'border-r border-t border-b border-slate-700/50 opacity-70'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <span className="text-2xl">{notification.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold text-sm ${!notification.read ? 'text-white' : 'text-slate-300'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm">{notification.message}</p>
                  <p className="text-slate-500 text-xs mt-2">{notification.time}</p>
                </div>
              </div>
              {!notification.read && (
                <span className="text-blue-400 text-xs bg-blue-500/10 px-2 py-1 rounded-full flex-shrink-0">
                  New
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}
