import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import More from "./more"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/more/:id" element={ <More/> } />
        {/* <Route path="contact" element={ <Contact/> } /> */}
      </Routes>
    </div>
  )
}

export default App