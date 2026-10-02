import { useEffect, useState } from 'react'
import { homepageSchema, type Homepage } from './schema'

type State = { status: 'loading' } | { status: 'ready'; content: Homepage } | { status: 'error' }

export function useHomepage() {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 10000)
    let active = true

    async function load() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}content/homepage.json`, {
          signal: controller.signal,
          cache: 'no-cache',
        })
        if (!response.ok) throw new Error('Content request failed')
        const content = homepageSchema.parse(await response.json())
        if (active) setState({ status: 'ready', content })
      } catch {
        if (active) setState({ status: 'error' })
      } finally {
        window.clearTimeout(timeout)
      }
    }

    void load()
    return () => { active = false; window.clearTimeout(timeout); controller.abort() }
  }, [attempt])

  return { state, retry: () => { setState({ status: 'loading' }); setAttempt((value) => value + 1) } }
}
