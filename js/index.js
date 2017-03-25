import React from "react"
import {render} from "react-dom"
import {Router, Route, hashHistory} from "react-router"
import App from "./App"
import Header from "./Header"
import Grid from "./Grid"
import Box from "./Box"
import Footer from "./Footer"

render(
  (
    <Router history={ hashHistory }>
      <Route component={ App }>
        <Route path="/" component={ Grid }/>
      </Route>
    </Router>
  ),
  document.getElementById("app")
)
