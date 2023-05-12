import React from "react"
import { Link } from "react-router-dom"

const Nav = (props) => {
    return (
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <Link to={"/"} className="text-3xl font-bold leading-none">
          <svg className="h-10" alt="logo" viewBox="0 0 10240 10240"><img src="./logo.svg" className="App-logo" alt="logo" /></svg>
        </Link>

      </nav>


    )
  }

  export default Nav
