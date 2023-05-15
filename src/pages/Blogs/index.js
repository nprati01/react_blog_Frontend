import { useState, useEffect } from 'react'
import { getBlogs } from '../../utils/blog-services'
import { Link } from 'react-router-dom'

import Moment from 'react-moment'


export default function Blogs(props) {

  const [blogs, setBlogs] = useState(null)
  const [isLoading, setIsLoading] = useState(true)




  async function handleRequest(){
    try {
      const apiResponse = await getBlogs()
      setBlogs(apiResponse)
      setIsLoading(false)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    handleRequest()
  }, [isLoading])

  const loaded = () => {
    return blogs?.map((blog) => {
      return (
              <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8 max-w-2xl mx-auto' key={blog._id}>
                <div className="relative overflow-hidden shadow-md pb-80 mb-6">
                  <img className="object-center absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg" src={blog.image} alt="" />
                </div>
                <h1 className='ransition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold"'>
                  <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                </h1>
                <div className="block lg:flex text-center items-center justify-center mb-8 w-full">

                  <div className="font-medium text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="align-middle"><Moment format='MMM DD, YYYY'>{blog.date}</Moment></span>
                  </div>
                </div>
                <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
                {blog.headline}
                </p>
                <div className="text-center">
                  <Link to={`/blogs/${blog._id}`}>
                  <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Continue Reading</span>
                </Link>
                </div>
              </div>
      );
    });
  };

  const loading = () => (
    <div className="blog-list">
      <h1>
        Loading...

      </h1>
    </div>
  );





  return (

    <>
      {isLoading ?  loading() : loaded()}
    </>
  );
}
