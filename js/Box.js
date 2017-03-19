import React from "react"
import { Link } from "react-router"
import Grid from "./Grid"

export default React.createClass({
  numberInput(e) {
    var boxContent = this.refs.numberInput.value
    this.props.updateBoard(this.props.i,this.props.j,boxContent)
  },
  render() {
    return(
      <input className="box_wrapper" ref="numberInput" type="number" placeholder={this.props.boxValue[this.props.i][this.props.j][0]} onChange={this.numberInput}></input>
    )
  }
})
