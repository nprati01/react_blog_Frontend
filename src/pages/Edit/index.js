import React, { useState, useEffect } from 'react'

import { getBlogDetails, deleteBlog, updateBlog } from '../../utils/blog-services'
import { useParams, useNavigate } from 'react-router-dom'



const Edit = () => {

    const { id } = useParams()
    const navigate = useNavigate()


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
        owner: "",

    })

    async function handleRequest() {
        try {
            const blogToEdit = await getBlogDetails(id)
            console.log('this it the blog to edit', blogToEdit)
            setBlog(blogToEdit)
            const { author, title, date, headline, image, content } = blogToEdit
            setEditForm({ author, title, date, headline, image, content})
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
        <div className="Edit-section-header">
            <h1>Edit Blog Post {blog.title}</h1>
            {"|"}
            <button onClick={handleBlogDelete}> Delete Blog</button>
        </div>

        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" value={editForm.author} name="author" placeholder="Enter the authors name " />
            {/* {blog title} */}
            <input onChange={handleChange} type="text" value={editForm.title} name="title" placeholder="Add the title of your Blog" />
            {/* {title} */}
            <input onChange={handleChange} type="text" value={editForm.date} name="date" placeholder="Enter todays date" />
            {/* {headline} */}
            <input onChange={handleChange} type="text" value={editForm.headline} name="headline" placeholder="Please Enter the Headline" />
            {/* {image} */}
            <input onChange={handleChange} type="text" value={editForm.image} name="image" placeholder="Add an optional image for your blog post" />
            {/* {content} */}
            <input onChange={handleChange} type="text" value={editForm.content} name="content" placeholder="Enter the content of this post" />

            <button> Save Changes </button>
        </form>
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
export default Edit
