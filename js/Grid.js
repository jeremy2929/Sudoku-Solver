import React from "react"
import { Link } from "react-router"
import Box from "./Box"

export default React.createClass({
  getInitialState() {
    return {
      boxRow: [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]]
    }
  },
  render() {
return (
    <section className="grid_wrapper">
      <h1>This is a grid kid</h1>
      <table >
        <tbody>
          {
            this.state.boxRow.map(function(rows, i) {
              return (
                <tr key={i}>
                  {
                    rows.map((cols, j)=>{
                      return (
                        <td key={j}><Box i={i} j={j}/></td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </section>
  )}
})
