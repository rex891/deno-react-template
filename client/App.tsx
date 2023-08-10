import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const incrementHandler = () => setCount(prevCount => prevCount + 1)

  return (
    <div className="App">
      hello dog {count}
      <button onClick={incrementHandler}></button>
    </div>
  )
}

export default App
