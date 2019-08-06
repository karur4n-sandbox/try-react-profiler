import React from 'react'
import ReactDOM from 'react-dom'

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root')

  ReactDOM.render(<App />, rootEl)
})

const Profiler = (React as any).Profiler as any

const App: React.FC = () => {
  const [counter, setCounter] = React.useState(0)

  const noop = React.useCallback(() => {}, [])

  React.useEffect(() => {
    const timerId = window.setInterval(() => {
      setCounter((prev) => prev + 1)
    }, 10)

    return () => {
      window.clearInterval(timerId)
    }
  }, [])

  return (
    <Profiler id="app" onRender={noop}>
      {range(counter).map((i) => (
        // あえて key={Math.random()}
        <NumberComponent key={Math.random()} n={i} />
      ))}
    </Profiler>
  )
}

function range(n: number): number[] {
  return [...new Array(n).keys()]
}

const NumberComponent: React.FC<{ n: number }> = ({ n }) => {
  return <div>{n}</div>
}
