import React, { useState, useEffect } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

import { getBlogDetails, deleteBlog, updateBlog } from '../../utils/blog-services'
import { useParams, useNavigate } from 'react-router-dom'



const Edit = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const {User} = useAuth0()


    // console.log(id)
    const [blog, setBlog] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [editForm, setEditForm] = useState({
        author: "",
        title:"",
        date: "",
        headline:"",
        image: "",
        content:"",
        owner: User.email,

    })

    async function handleRequest() {
        try {
            const blogToEdit = await getBlogDetails(id)
            console.log('this it the blog to edit', blogToEdit)
            setBlog(blogToEdit)
            const { author, title, date, headline, image, content, owner} = blogToEdit
            setEditForm({ author, title, date, headline, image, content, owner})
            setIsLoading(false)

        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() =>
    {handleRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    async function handleBlogDelete() {
        try {
            // call the delete utitlity
            const delResponse = await deleteBlog(id)
            console.log(delResponse)

            if (delResponse._id) {
                navigate('/')
            } else {
                throw new Error("Something went wrong")
            }
            // check response -> if okay -> redirect to success location
            // if not ok -> throw error
        } catch (err) {
            console.log(err)
            navigate(`/blogs/${id}`)
            // error -> redirect back to current page
        }
    }

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log('this is edit form', editForm)
            const updatedBlog = await updateBlog(id, editForm)

            if (updatedBlog._id) {

                navigate(`/blogs/${id}`)
            } else {
                throw Error('Something went wrong')
            }
        } catch (err) {
            navigate(`/blogs/${id}/edit`)
        }
    }

    const loaded = () =>
        (


        <>
        <div className="p-6 max-w-md mx-auto mb-4 bg-white rounded-xl shadow-lg justify-content-center">
        <h2 className="text-xl font-medium text-black pb-3">You are Editing Blog Post: <span className='font-bold'>{blog.title}</span> </h2>
            <div className='grid grid-cols-2'>
                <img className="w-40 h-36 self-center rounded-xl m-3" src={blog.image} alt="" />
            <div className='pt-2'>
                <p><span className='font-bold'>Author:</span> {blog.author}</p>
                <p><span className='font-bold'>Headline:</span><span className='italic'>{blog.headline}</span> </p>
            </div>
                <button className="px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2" onClick={handleBlogDelete}> Delete Blog</button>
            </div>
        </div>
        <section className="bg-white shadow-lg rounded-lg mx-auto md:max-w-md xl:max-w-2xl p-4">
            <form className="grid grid-cols-1 md:max-w-l xl:max-w-xl gap-4 my-12 mx-auto pt-4" onSubmit={handleSubmit}>
            {/* {name} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">Content Creator Name</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={editForm.author} name="author" placeholder="Enter the authors name " />
            {/* {blog title} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">Post Title</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={editForm.title} name="title" placeholder="Add the title of your Blog" />
            {/* {date} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">Today's date</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={editForm.date} name="date" placeholder="Enter todays date" />
            {/* {headline} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">Headline</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={editForm.headline} name="headline" placeholder="Please Enter the Headline" />
            {/* {image} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">Include Optional Image</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={editForm.image} name="image" placeholder="Add an optional image for your blog post" />
            {/* {content} */}
            <label className="mt-2 uppercase font-bold text-lg text-grey-darkest">New Post Content</label>
            <textarea className="p-4 outline-none w-full rounded-lg h-80 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" onChange={handleChange} type="text" value={editForm.content} name="content" placeholder="Enter the content of this post" />

            <button className="px-4 py-1 text-sm text-emerald-400 font-semibold rounded-full border border-emerald-50 hover:text-white hover:bg-emerald-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2">Save Changes</button>
            </form>
            <button className="px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2" onClick={handleBlogDelete}> Delete Blog</button>


        </section>


        </>
        )




    const loading = () => {
        return (
            <div className="Loading">
                <h1>
                    Loading...

                </h1>
            </div>
        )
    }

    return (
        <section className="Edit-container">
            {isLoading ? loading() : loaded()}
        </section>
    )
}
export default withAuthenticationRequired(Edit, {
    // Show a message while the user waits to be redirected to the login page.
    onRedirecting: () => <div>Redirecting you to the login page...</div>,
  });
