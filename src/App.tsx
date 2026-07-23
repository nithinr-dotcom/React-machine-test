import { useState } from 'react'
import { tasks } from './tasks/registry'
import { levelNames, type Level } from './tasks/types'

const LEVELS: Level[] = [0, 1, 2, 3, 4]

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(tasks[0]?.id ?? null)
  const selected = tasks.find((task) => task.id === selectedId)

  return (
    <div className="grid min-h-screen grid-cols-1 sm:grid-cols-[260px_1fr]">
      <aside className="bg-surface border-line border-b px-4 py-5 sm:border-r sm:border-b-0">
        <h1 className="text-muted mb-5 text-[13px] tracking-[0.06em] uppercase">
          React Machine Tasks
        </h1>

        {LEVELS.map((level) => {
          const levelTasks = tasks.filter((task) => task.level === level)
          if (levelTasks.length === 0) return null

          return (
            <div key={level}>
              <p className="text-muted mt-[18px] mb-1.5 text-[11px] tracking-[0.06em] uppercase">
                {levelNames[level]}
              </p>
              <ul className="m-0 list-none p-0">
                {levelTasks.map((task) => (
                  <li key={task.id}>
                    <button
                      type="button"
                      className={`w-full cursor-pointer rounded-md px-2.5 py-1.5 text-left text-sm ${
                        task.id === selectedId
                          ? 'bg-accent text-white'
                          : 'hover:bg-hover bg-transparent'
                      }`}
                      onClick={() => setSelectedId(task.id)}
                    >
                      {task.id} · {task.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </aside>

      <main className="px-5 py-6 sm:px-10 sm:py-8">
        {selected ? (
          <selected.Component />
        ) : (
          <p className="text-muted text-sm leading-relaxed">
            No tasks registered yet.
            <br />
            Build one in <code>src/tasks/NN-name/index.tsx</code>, then add it to{' '}
            <code>src/tasks/registry.ts</code>.
          </p>
        )}
      </main>
    </div>
  )
}

export default App
