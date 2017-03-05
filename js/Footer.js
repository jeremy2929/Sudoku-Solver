import React from "react"
import { Link } from "react-router"
//FIXME: Do we want a copyright here?
//FIXME: Need to insert links for anchors
export default React.createClass({
  render() {
    return(
      <footer className="footer_wrapper">
        <section>
          <ul>
            <li>
              Handcrafted in San Antonio, TX USA
            </li>
            <li>
              <a
                href=""
                type="_blank">
                Contact Us
              </a>
            </li>
            <li>
              <a
                href=""
                type="_blank">
                More Info
              </a>
            </li>
          </ul>
        </section>
      </footer>
    )
  }
})
