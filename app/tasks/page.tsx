'use client'
import { useState } from 'react'
import Link from 'next/link'


const initialTasks = {
  todo: [
    { id: 1, title: 'Build Data Preprocessing Pipeline', intern: 'Rahul Sharma', priority: 'High', category: 'Technical', due: 'Apr 2' },
    { id: 2, title: 'Document API Integration', intern: 'Priya Mehta', priority: 'Medium', category: 'Technical', due: 'Apr 5' },
    { id: 3, title: 'Create Presentation Slides', intern: 'Arjun Kumar', priority: 'Low', category: 'Administrative', due: 'Apr 10' },
  ],
  inProgress: [
    { id: 4, title: 'Research AI Model Architectures', intern: 'Rahul Sharma', priority: 'High', category: 'Research', due: 'Mar 30' },
    { id: 5, title: 'Design Database Schema', intern: 'Sneha Rao', priority: 'High', category: 'Technical', due: 'Mar 31' },
  ],
  underReview: [
    { id: 6, title: 'Weekly Progress Report', intern: 'Priya Mehta', priority: 'Medium', category: 'Administrative', due: 'Mar 29' },
    { id: 7, title: 'Market Research Analysis', intern: 'Amit Patel', priority: 'Medium', category: 'Research', due: 'Mar 28' },
  ],
  completed: [
    { id: 8, title: 'Attend Mentor Session', intern: 'Rahul Sharma', priority: 'Low', category: 'Other', due: 'Mar 28' },
    { id: 9, title: 'Setup Development Environment', intern: 'Arjun Kumar', priority: 'High', category: 'Technical', due: 'Mar 25' },
    { id: 10, title: 'Submit Project Proposal', intern: 'Sneha Rao', priority: 'High', category: 'Administrative', due: 'Mar 24' },
  ],
}

const columns = [
  { key: 'todo', label: '📋 To Do', color: 'border-slate-500' },
  { key: 'inProgress', label: '⚡ In Progress', color: 'border-blue-500' },
  { key: 'underReview', label: '👀 Under Review', color: 'border-yellow-500' },
  { key: 'completed', label: '✅ Completed', color: 'border-green-500' },
]

type Task = {
  id: number
  title: string
  intern: string
  priority: string
  category: string
  due: string
}

type TaskBoard = {
  todo: Task[]
  inProgress: Task[]
  underReview: Task[]
  completed: Task[]
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskBoard>(initialTasks)
  const [draggedTask, setDraggedTask] = useState<{ task: Task; fromColumn: string } | null>(null)

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'text-red-400 bg-red-500/10'
    if (priority === 'Medium') return 'text-yellow-400 bg-yellow-500/10'
    return 'text-green-400 bg-green-500/10'
  }

  const getCategoryColor = (category: string) => {
    if (category === 'Technical') return 'text-blue-400'
    if (category === 'Research') return 'text-purple-400'
    if (category === 'Administrative') return 'text-orange-400'
    return 'text-slate-400'
  }

  const handleDragStart = (task: Task, fromColumn: string) => {
    setDraggedTask({ task, fromColumn })
  }

  const handleDrop = (toColumn: string) => {
    if (!draggedTask || draggedTask.fromColumn === toColumn) return

    setTasks(prev => {
      const fromTasks = prev[draggedTask.fromColumn as keyof TaskBoard].filter(
        t => t.id !== draggedTask.task.id
      )
      const toTasks = [...prev[toColumn as keyof TaskBoard], draggedTask.task]
      return {
        ...prev,
        [draggedTask.fromColumn]: fromTasks,
        [toColumn]: toTasks,
      }
    })
    setDraggedTask(null)
  }

  const totalTasks = Object.values(tasks).flat().length
  const completedTasks = tasks.completed.length

  return (
    <main className="min-h-screen bg-[#0f172a] p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/login" className="text-slate-400 text-sm hover:text-white">← Back to Login</Link>
          <h1 className="text-3xl font-bold text-white mt-2">Task Management Board</h1>
          <p className="text-slate-400">Marconpra · AI Development Batch 1 · Kanban View</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-2 text-sm">
            <span className="text-slate-400">Progress: </span>
            <span className="text-green-400 font-bold">{completedTasks}/{totalTasks} tasks</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium">
            + New Task
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-4 mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-slate-400 text-sm">Overall Completion</span>
          <span className="text-white font-bold text-sm">{Math.round((completedTasks / totalTasks) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>{tasks.todo.length} To Do</span>
          <span>{tasks.inProgress.length} In Progress</span>
          <span>{tasks.underReview.length} Under Review</span>
          <span>{tasks.completed.length} Completed</span>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div
            key={column.key}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.key)}
            className={`bg-[#1e293b] border-t-4 ${column.color} rounded-2xl p-4 min-h-96`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-sm">{column.label}</h3>
              <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">
                {tasks[column.key as keyof TaskBoard].length}
              </span>
            </div>

            {/* Tasks */}
            {tasks[column.key as keyof TaskBoard].map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task, column.key)}
                className="bg-[#0f172a] border border-slate-700 hover:border-slate-500 rounded-xl p-4 mb-3 cursor-grab active:cursor-grabbing transition-all hover:scale-105"
              >
                <p className="text-white text-sm font-medium mb-2">{task.title}</p>
                <p className="text-slate-400 text-xs mb-3">👤 {task.intern}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`text-xs ${getCategoryColor(task.category)}`}>
                    {task.category}
                  </span>
                </div>
                <p className="text-slate-500 text-xs mt-2">Due: {task.due}</p>
              </div>
            ))}

            {/* Drop Zone Hint */}
            {tasks[column.key as keyof TaskBoard].length === 0 && (
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-4 text-center">
                <p className="text-slate-600 text-xs">Drop tasks here</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </main>
  )
}
