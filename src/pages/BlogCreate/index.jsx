import React from 'react'
import { createBlog } from '../../utils/blog-services'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';



const BlogCreate = (props)=> {
  const { user } = useAuth0();
  const navigate = useNavigate();






    const [newForm, setNewForm] = useState({
        author: "",
        title:"",
        date: "",
        headline:"",
        image: "",
        content:"",
        owner:{user}



      })

    const handleChange =(e) =>{

        setNewForm({...newForm, [e.target.name]:e.target.value })
      }

    const handleSubmit = async (e) => {
        // prevents the page from refreshing / redirecting request to external source
        e.preventDefault()
        try {
            // pass local state (after submit) to API utility service
            await createBlog(newForm)
            // after async process is complete, set loading to true if no error is returned and clear out form

            setNewForm({
              author: "",
              title: "",
              date: "",
              headline: "",
              image: "",
              content: "",

            })
            navigate('/blogs')
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <section>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            {/* {name} */}
            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Content Creator Name</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={newForm.author} name="author" placeholder="Enter the authors name " />
            {/* {blog title} */}
            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Post Title</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={newForm.title} name="title" placeholder="Add the title of your Blog" />
            {/* {date} */}
            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Today's date</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={newForm.date} name="date" placeholder="Enter todays date" />
            {/* {headline} */}
            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Headline</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={newForm.headline} name="headline" placeholder="Please Enter the Headline" />
            {/* {image} */}
            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Include Optional Image</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={newForm.image} name="image" placeholder="Add an optional image for your blog post" />
            {/* {content} */}
            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">New Post Content</label>
            <textarea className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={newForm.content} name="content" placeholder="Enter the content of this post" />

            <button className="block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded">Create new post</button>
        </form>
    </section>
  )
}
export default withAuthenticationRequired(BlogCreate, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});

