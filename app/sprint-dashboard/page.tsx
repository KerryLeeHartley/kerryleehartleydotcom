'use client'

import { useEffect, useState } from 'react'

const SUPABASE_URL = 'https://vkprcyfaijsjiwqjifzy.supabase.co/rest/v1'
const ANON_KEY = 'sb_publishable_3Cnlc_Td0g0WSRXx0Z0fcg_j3HjaKw_'

type Project = { notion_id: string; name: string; notion_url: string }
type Sprint  = { notion_id: string; name: string; status: string; project_notion_id: string; notion_url: string }
type Task    = { notion_id: string; name: string; status: string; sprint_notion_id: string | null }

const STATUS_ORDER = ['In Progress', 'This Week', 'Blocked', 'Done', 'Backlog'] as const

const STATUS_STYLES: Record<string, { pill: string }> = {
  'In Progress': { pill: 'bg-blue-950 text-blue-400 border border-blue-800' },
  'This Week':   { pill: 'bg-yellow-950 text-yellow-400 border border-yellow-800' },
  'Blocked':     { pill: 'bg-red-950 text-red-400 border border-red-800' },
  'Done':        { pill: 'bg-green-950 text-green-400 border border-green-800' },
  'Backlog':     { pill: 'bg-neutral-800 text-neutral-400 border border-neutral-700' },
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`${res.status} — ${body}`)
  }
  return res.json()
}

export default function SprintDashboard() {
  const [sprints, setSprints]   = useState<Sprint[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks]       = useState<Task[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      get<Sprint[]>('/sprints?select=*&order=created_at.asc'),
      get<Project[]>('/projects?select=notion_id,name,notion_url'),
      get<Task[]>('/tasks?select=notion_id,name,status,sprint_notion_id'),
    ])
      .then(([s, p, t]) => { setSprints(s); setProjects(p); setTasks(t) })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center">
      <div className="flex items-center gap-3 text-neutral-500 text-sm">
        <div className="w-4 h-4 border-2 border-neutral-700 border-t-neutral-400 rounded-full animate-spin" />
        Loading sprints…
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-[#111] p-6">
      <div className="bg-red-950 border border-red-800 rounded-lg p-4 text-red-400 text-sm">
        <strong className="block mb-1">Could not load data</strong>
        {error}
      </div>
    </div>
  )

  const projectByUrl: Record<string, Project> = {}
  for (const p of projects) if (p.notion_url) projectByUrl[p.notion_url] = p

  const tasksBySprint: Record<string, Task[]> = {}
  for (const t of tasks) {
    if (!t.sprint_notion_id) continue
    ;(tasksBySprint[t.sprint_notion_id] ??= []).push(t)
  }

  return (
    <div className="min-h-screen bg-[#111] p-6 max-w-2xl mx-auto">
      <p className="text-[11px] font-semibold text-neutral-600 uppercase tracking-widest mb-5">
        Sprint Dashboard
      </p>

      <div className="flex flex-col gap-4">
        {sprints.map(sprint => {
          const project     = projectByUrl[sprint.project_notion_id] ?? null
          const sprintTasks = tasksBySprint[sprint.notion_url] ?? []
          const counts: Record<string, number> = {}
          for (const t of sprintTasks) counts[t.status] = (counts[t.status] ?? 0) + 1
          const done  = counts['Done'] ?? 0
          const total = sprintTasks.length
          const pct   = total > 0 ? Math.round((done / total) * 100) : 0

          return (
            <div key={sprint.notion_id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5">
              <div className="mb-4">
                <p className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-1">
                  {project?.name ?? '—'}
                </p>
                <p className="text-[17px] font-bold text-white leading-snug">{sprint.name}</p>
              </div>

              {total === 0 ? (
                <p className="text-neutral-600 text-sm italic">No tasks linked yet</p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {STATUS_ORDER.filter(s => counts[s]).map(s => (
                      <span key={s} className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[s].pill}`}>
                        <span className="font-bold">{counts[s]}</span>{s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-[#242424] rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-500 whitespace-nowrap min-w-[68px] text-right">
                      {done}/{total} — {pct}%
                    </span>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
