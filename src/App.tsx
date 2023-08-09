import { Counter } from "./features/counter/Counter"
import { ParentComponent } from "./features/funds/ParentComponent"
import "./App.css"
import { VanillaCheckboxesParent } from "./features/vanilla-checkboxes/VanillaCheckboxesParent";
import CubeStack from "./features/cubes/CubeStack";

function App() {
  const selectedIds = [1, 3];

  return (
    <div className="App">
      <header className="App-header">
        {/* <ParentComponent selectedIds={selectedIds} /> */}
        {/* <VanillaCheckboxesParent /> */}
        {/* <Counter /> */}
        <CubeStack />
      </header>
    </div>
  )
}

export default App
