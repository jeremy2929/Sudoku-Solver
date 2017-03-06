import React from "react"
import { Link } from "react-router"
import Box from "./Box"

export default React.createClass({
  render() {
    return(
      <section className="grid_wrapper">
        <h1>This is a grid kid</h1>
        <Box />
      </section>
    )
  }
})
