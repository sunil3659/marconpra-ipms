import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-8">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs tracking-widest px-4 py-2 rounded-full mb-6">
          MARCONPRA · AI PRODUCTS DIVISION
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Internship Program
          <span className="text-blue-400"> Management System</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          AI-powered platform to manage interns, mentors, evaluations and performance — built for Marconpra's growing AI division.
        </p>
      </div>

      {/* Role Cards — 4 roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mb-12">

        <Link href="/dashboard/ceo">
          <div className="bg-[#1e293b] border border-slate-700 hover:border-blue-500 rounded-2xl p-6 cursor-pointer transition-all hover:scale-105">
            <div className="text-3xl mb-3">👔</div>
            <h2 className="text-white font-bold text-lg mb-2">CEO Dashboard</h2>
            <p className="text-slate-400 text-sm">Organisation-wide overview, AI executive summaries, program health scores</p>
            <div className="mt-4 text-blue-400 text-sm font-medium">Enter as CEO →</div>
          </div>
        </Link>

        <Link href="/dashboard/director">
          <div className="bg-[#1e293b] border border-slate-700 hover:border-orange-500 rounded-2xl p-6 cursor-pointer transition-all hover:scale-105">
            <div className="text-3xl mb-3">🎯</div>
            <h2 className="text-white font-bold text-lg mb-2">Program Director</h2>
            <p className="text-slate-400 text-sm">Manage programs, cohorts, milestones and intern enrollments</p>
            <div className="mt-4 text-orange-400 text-sm font-medium">Enter as Director →</div>
          </div>
        </Link>

        <Link href="/dashboard/mentor">
          <div className="bg-[#1e293b] border border-slate-700 hover:border-purple-500 rounded-2xl p-6 cursor-pointer transition-all hover:scale-105">
            <div className="text-3xl mb-3">👨‍🏫</div>
            <h2 className="text-white font-bold text-lg mb-2">Mentor Dashboard</h2>
            <p className="text-slate-400 text-sm">Manage interns, submit evaluations, AI-generated performance narratives</p>
            <div className="mt-4 text-purple-400 text-sm font-medium">Enter as Mentor →</div>
          </div>
        </Link>

        <Link href="/dashboard/intern">
          <div className="bg-[#1e293b] border border-slate-700 hover:border-green-500 rounded-2xl p-6 cursor-pointer transition-all hover:scale-105">
            <div className="text-3xl mb-3">🎓</div>
            <h2 className="text-white font-bold text-lg mb-2">Intern Dashboard</h2>
            <p className="text-slate-400 text-sm">View tasks, attendance, evaluations and personal progress reports</p>
            <div className="mt-4 text-green-400 text-sm font-medium">Enter as Intern →</div>
          </div>
        </Link>

      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mb-8">
        {[
          { value: '47', label: 'Active Interns' },
          { value: '4', label: 'Programs Running' },
          { value: '84%', label: 'Avg Attendance' },
          { value: '91%', label: 'Completion Rate' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#1e293b] border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* AI Badge */}
      <div className="flex items-center gap-3 bg-[#1e293b] border border-slate-700 rounded-full px-6 py-3">
        <span className="text-pink-400">🤖</span>
        <span className="text-slate-300 text-sm">Powered by AI — Live evaluation narratives, CEO summaries & risk detection</span>
      </div>

    </main>
  )
}
