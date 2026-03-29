'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const roles = [
  { id: 'ceo', title: 'CEO', icon: '👔', color: 'blue', description: 'Executive overview & AI summaries', route: '/dashboard/ceo' },
  { id: 'director', title: 'Program Director', icon: '🎯', color: 'orange', description: 'Manage programs & cohorts', route: '/dashboard/director' },
  { id: 'mentor', title: 'Mentor', icon: '👨‍🏫', color: 'purple', description: 'Evaluate & guide interns', route: '/dashboard/mentor' },
  { id: 'intern', title: 'Intern', icon: '🎓', color: 'green', description: 'Track progress & tasks', route: '/dashboard/intern' },
]

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId)
  }

  const handleLogin = async () => {
    if (!email || !password || !selectedRole) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const role = roles.find(r => r.id === selectedRole)
    if (role) router.push(role.route)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0f172a] flex items-center justify-center p-8">
      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs tracking-widest px-4 py-2 rounded-full mb-4">
            MARCONPRA · AI PRODUCTS DIVISION
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to <span className="text-blue-400">IPMS</span>
          </h1>
          <p className="text-slate-400 text-sm">Internship Program Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8">

          {/* Step 1 — Select Role */}
          {step === 1 && (
            <div>
              <h2 className="text-white font-bold text-lg mb-2">Select Your Role</h2>
              <p className="text-slate-400 text-sm mb-6">Choose how you want to access the system</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedRole === role.id
                        ? role.color === 'blue' ? 'border-blue-500 bg-blue-500/10' :
                          role.color === 'orange' ? 'border-orange-500 bg-orange-500/10' :
                          role.color === 'purple' ? 'border-purple-500 bg-purple-500/10' :
                          'border-green-500 bg-green-500/10'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{role.icon}</div>
                    <p className="text-white font-medium text-sm">{role.title}</p>
                    <p className="text-slate-400 text-xs mt-1">{role.description}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => selectedRole && setStep(2)}
                disabled={!selectedRole}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 rounded-xl font-medium transition-all"
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 — Enter Credentials */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="text-slate-400 text-sm hover:text-white mb-4 block"
              >
                ← Change Role
              </button>
              <div className="flex items-center gap-3 mb-6 p-3 bg-[#0f172a] rounded-xl">
                <span className="text-2xl">{roles.find(r => r.id === selectedRole)?.icon}</span>
                <div>
                  <p className="text-white font-medium text-sm">Signing in as {roles.find(r => r.id === selectedRole)?.title}</p>
                  <p className="text-slate-400 text-xs">{roles.find(r => r.id === selectedRole)?.description}</p>
                </div>
              </div>
              <h2 className="text-white font-bold text-lg mb-6">Enter Your Credentials</h2>
              <div className="mb-4">
                <label className="text-slate-400 text-sm mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@marconpra.com"
                  className="w-full bg-[#0f172a] border border-slate-600 focus:border-blue-500 text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all"
                />
              </div>
              <div className="mb-6">
                <label className="text-slate-400 text-sm mb-2 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0f172a] border border-slate-600 focus:border-blue-500 text-white placeholder-slate-500 rounded-xl px-4 py-3 outline-none transition-all"
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={!email || !password || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 rounded-xl font-medium transition-all"
              >
                {loading ? '⏳ Signing in...' : '🚀 Sign In'}
              </button>
              <p className="text-slate-500 text-xs text-center mt-4">
                Demo: use any email and password
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <p className="text-slate-600 text-xs text-center mt-6">
          Marconpra IPMS v1.0 · AI Products Division · Confidential
        </p>

      </div>
    </main>
  )
}