import { useState, useEffect } from 'react'
import { getBlogs, createBlog } from '../../utils/blog-services'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'


export default function Blogs(props) {

  const [blogs, setBlogs] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newForm, setNewForm] = useState({
    author: "",
    title:"",
    date: "",
    headline:"",
    image: "",
    content:""
  })


  async function handleRequest(){
    try {
      const apiResponse = await getBlogs()
      setBlogs(apiResponse)
      console.log(apiResponse)
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
        <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8' key={blog._id}>
          <div className="relative overflow-hidden shadow-md pb-80 mb-6">
            <img className="object-top absolute h-full w-full   shadow-lg rounded-t-lg lg:rounded-lg" src={blog.image} alt="" />
          </div>
          <h1 className='ransition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold"'>
            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
          </h1>
          <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
            <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
              Add author image
              <p className='inline align-middle text-gray-700 ml-2 font-medium text-lg'>{blog.author}</p>
            </div>
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

  const handleSubmit = async (e) => {
    // prevents the page from refreshing / redirecting request to external source
    e.preventDefault()
    try {
        // pass local state (after submit) to API utility service
        await createBlog(newForm)
        // after async process is complete, set loading to true if no error is returned and clear out form
        setIsLoading(true)
        setNewForm({
          author: "",
          title: "",
          date: "",
          headline: "",
          image: "",
          content: ""
        })
    } catch (err) {
        console.log(err)
    }
}
const handleChange =(e) =>{
  console.log("typing...", e.target.name)
  setNewForm({...newForm, [e.target.name]:e.target.value })
}



  return (
    <section className="blog-list">
      <form onSubmit={handleSubmit}>
          {/* {name} */}
          <input onChange={handleChange} type="text" value={newForm.author} name="author" placeholder="Enter the authors name " />
          {/* {blog title} */}
          <input onChange={handleChange} type="text" value={newForm.title} name="title" placeholder="Add the title of your Blog" />
          {/* {title} */}
          <input onChange={handleChange} type="text" value={newForm.date} name="date" placeholder="Enter todays date" />
          {/* {headline} */}
          <input onChange={handleChange} type="text" value={newForm.headline} name="headline" placeholder="Please Enter the Headline" />
          {/* {image} */}
          <input onChange={handleChange} type="text" value={newForm.image} name="image" placeholder="Add an optional image for your blog post" />
          {/* {content} */}
          <input onChange={handleChange} type="text" value={newForm.content} name="content" placeholder="Enter the content of this post" />

          <button>Create new post</button>
        </form>

    {isLoading ?  loading() : loaded()}
    </section>
  );
}
