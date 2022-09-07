import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Index from './components';
import './App.css'
import Lista from './components/Lista';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        {/* <Index /> */}
        <Lista />
    </div>
  )
}

export default App
