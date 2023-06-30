import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import { ParentComponent } from "./features/funds/ParentComponent"
import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ParentComponent />
        {/* <Counter /> */}
      </header>
    </div>
  )
}

export default App
