
import { useState } from 'react'

const MIN = -100
const MAX = 100

const roundFloat = (value: number) => Math.round(value * 1e10) / 1e10

const clamp = (value: number) => roundFloat(Math.min(MAX, Math.max(MIN, value)))

export default function Counter() {
  const [count, setCount] = useState(0)

  const [stepText, setStepText] = useState('1')

  const step = Number(stepText)

  const stepValid = stepText.trim() !== '' && Number.isFinite(step) && step !== 0

  const nextUp = clamp(count + step)
  const nextDown = clamp(count - step)

  return (
    <div>
      <div>
        <label htmlFor="step">Step </label>
        <input
          id="step"
          type="number"
          value={stepText}
          onChange={(e) => setStepText(e.target.value)}
        />
      </div>

      <h1>{count}</h1>

      <div>
        <button
          type="button"
          disabled={!stepValid || nextUp === count}
          onClick={() => setCount(nextUp)}
        >
          Increment
        </button>
        <button
          type="button"
          disabled={!stepValid || nextDown === count}
          onClick={() => setCount(nextDown)}
        >
          Decrement
        </button>
        <button type="button" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  )
}
