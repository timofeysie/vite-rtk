import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import { ParentComponent } from "./features/funds/ParentComponent"
import "./App.css"
import data from "./features/funds/data.json";

function App() {
  const selectedIds = [1, 3];

  return (
    <div className="App">
      <header className="App-header">
        <ParentComponent fundList={data} selectedIds={selectedIds} />
        {/* <Counter /> */}
      </header>
    </div>
  )
}

export default App
