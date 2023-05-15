import LoginButton from '../../components/Login'

import { Link } from 'react-router-dom'



import React from 'react'

const Home = () => {
  return (
    <div className="animate-flip-up bg-white shadow-lg rounded-lg p-8 pb-12 mt-8 mb-8 md:max-w-lg mx-auto ">
    <h2> Hi there &#x1F44B; ! </h2>
    <p>For the best user experience we reccomend logging in or creating an account. </p>
    <p> if your just here for the blogs then proceed by clicking on the link below or navigating at the top of the page</p>

    <LoginButton />

    <Link to={"/blogs"} className="text-3xl font-bold leading-none"><button className='m-3'>Gimme the Content</button></Link>


    </div>
  )
}

export default Home
