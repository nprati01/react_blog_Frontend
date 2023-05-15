import React from "react"

import { Link } from "react-router-dom"
import LoginButton from "../Login"
import LogoutButton from "../Logout"


const Nav = (props) => {
    return (
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <Link to={"/"} className="text-3xl font-bold leading-none">Home</Link>
        <Link to={"/blogs"} className="text-3xl font-bold leading-none">Blogs</Link>
        <Link to={"/blogs/create"} className="text-3xl font-bold leading-none">Create New Post</Link>
        
        <LogoutButton />



      </nav>


    )
  }

  export default Nav
