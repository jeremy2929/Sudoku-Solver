import React from "react"
import { Link } from "react-router"
import Grid from "./Grid"

export default React.createClass({

  numberInput(e) {

    console.log(this.props.i);
    console.log(this.props.j);
    var boxContent = this.refs.numberInput.value
    console.log("boxContent:",boxContent);
    this.props.updateBoard(this.props.i,this.props.j,boxContent)
  },
  render() {

    return(
      <input className="box_wrapper" ref="numberInput" type="number" onChange={this.numberInput}>

      </input>

    )
  }
})
