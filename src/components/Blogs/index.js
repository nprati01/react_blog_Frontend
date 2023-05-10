import { useState, useEffect } from 'react'
import { getBlogs, createBlog } from '../../utils/blog-services'
import { Link } from 'react-router-dom'


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
        <div key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>
          <h1>{blog.title}</h1>
          <img className="profile-image" src={blog.image} alt="" />
          <h3>{blog.author}</h3>
          </Link>
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
