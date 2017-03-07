import React from "react"
import { Link } from "react-router"
import Box from "./Box"

export default React.createClass({
  getInitialState() {

    return {

      boxRow: [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9]],
      boxValue: [[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]],[[]]
    }
  },
  updateBoard(i, j, boxContent) {
    this.state.boxValue[j][i] = boxContent
  },
  render() {
return (
    <section className="grid_wrapper">
      <table >
        <tbody>
          {
            this.state.boxRow.map((rows, i)=> {
              return (
                <tr className="boxArea" key={i}>
                  {
                    rows.map((cols, j)=>{
                      return (
                        <td key={j}><Box i={i} j={j} updateBoard={this.updateBoard}/></td>
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
