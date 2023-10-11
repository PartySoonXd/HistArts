import React from "react"
import AppRouter from "./components/AppRouter/AppRouter"
import { BrowserRouter as Router} from "react-router-dom"

export default function App (){


  return (
    <div className="page">
      <Router>
        <AppRouter/>
      </Router>
    </div>
    )
}
