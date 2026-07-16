import { Routes, Route } from "react-router"
// views:
import Login from "./modules/login/views/login.tsx"
import Register from "./modules/login/views/register.tsx"
import ViewApp from "./modules/application/viewApp.tsx"

function App() {

  return (
    <Routes>
      <Route element={<Login></Login>} path="/"></Route>
      <Route element={<Register></Register>} path="/create"></Route>
      <Route element={<ViewApp></ViewApp>} path="/app"></Route>
    </Routes>
  )
}

export default App
