import React from "react"
import { Link } from "react-router"
import Box from "./Box"

var userButtons = [
    {
        id: 1,
        lastName: 'Smith',
        firstName: 'Joe',
        buttons: [
            {
                id: 0,
                value: "Click 1A",
                enabled: 1
            }, {
                id: 1,
                value: "Click 1B",
                enabled: 1
            }
        ]
    },
    {
        id: 2,
        lastName: 'Murphy',
        firstName: 'Mary',
        buttons: [
            {
                id: 0,
                value: "Click 2A",
                enabled: 1
            }, {
                id: 1,
                value: "c12b",
                enabled: 1
            }
        ]
    }
];

 //<Box />

export default React.createClass({
  render() {
    console.log(boxRow);
return (

    <section>
      <h1>This is a grid kid</h1>
        <table>
        {
            userButtons.map(function(ub) {

                var buttons = ub.buttons.map(function(button) {
                    return (
                        <td >x{button.value}</td>
                    )
                });
                return (
                    <tr>
                        <td >{ub.firstName}</td>
                        <td>{ub.lastName}</td>
                        {buttons}
                    </tr>
                )
            })
        }
      }
    </table>
    </section>


)}



})
