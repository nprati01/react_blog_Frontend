import React from 'react'
import { createBlog } from '../../utils/blog-services'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';



const BlogCreate = (props)=> {
  const { User} = useAuth0();
  const navigate = useNavigate();






    const [newForm, setNewForm] = useState({
        author: "",
        title:"",
        date: "",
        headline:"",
        image: "",
        content:"",
        owner: User.sub



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
              owner: "",



            })
            navigate('/blogs')
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <section className="bg-white shadow-lg rounded-lg lg:max-w-2xl lg:p-8 pb-12 mb-8 mx-auto">
        <form className="grid grid-cols-1   md:max-w-75% xl:max-w-xl gap-4 my-12 mx-auto pt-4" onSubmit={handleSubmit}>
            {/* {name} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">Content Creator Name</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={newForm.author} name="author" placeholder="Enter the authors name " />
            {/* {blog title} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">Post Title</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={newForm.title} name="title" placeholder="Add the title of your Blog" />
            {/* {date} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">Today's date</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={newForm.date} name="date" placeholder="Enter todays date" />
            {/* {headline} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">Headline</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={newForm.headline} name="headline" placeholder="Please Enter the Headline" />
            {/* {image} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">Include Optional Image</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={newForm.image} name="image" placeholder="Add an optional image for your blog post" />



            {/* {content} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">New Post Content</label>
            <textarea className="p-4 outline-none w-full rounded-lg h-80 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" onChange={handleChange} type="text" value={newForm.content} name="content" placeholder="Enter the content of this post" />








            <button className="px-4 py-1 text-sm text-pink-600 font-semibold rounded-full border border-pink-200 hover:text-white hover:bg-pink-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2">Create new post</button>
        </form>
    </section>
  )
}
export default withAuthenticationRequired(BlogCreate, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
