import React from "react"
import { Link } from "react-router"
import Grid from "./Grid"

export default React.createClass({
  getInitialState() {
    return {
      boxValue: [[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,],[,,,,,,,,]]
    }
  },
  numberInput(e) {
    console.log(this.props.i);
    console.log(this.props.j);
    console.log(this.refs.numberInput.value);
    console.log("1");
    this.state.boxValue[this.props.j][this.props.i] = this.refs.numberInput.value
      console.log(this.state.boxValue);
  },
  render() {
    console.log(this.state.boxValue);
    return(
      <input className="box_wrapper" ref="numberInput" type="number" onChange={this.numberInput}>

      </input>

    )
  }
})
