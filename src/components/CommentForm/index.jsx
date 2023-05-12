import React from 'react'
import { createComment } from '../../utils/comment-services'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';



const CommentForm = (props)=> {
    const { user } = useAuth0();
    const navigate = useNavigate();
    const [commentForm, setCommentForm] = useState({
        owner:{user},
        date: "",
        comment:"",
        blog: blog._id,
    })
    const handleChange =(e) =>{
        setCommentForm({...commentForm, [e.target.name]:e.target.value })
      }

    const handleSubmit = async (e) => {
        // prevents the page from refreshing / redirecting request to external source
        e.preventDefault()
        try {
            // pass local state (after submit) to API utility service
            await createComment(commentForm)
            // after async process is complete, set loading to true if no error is returned and clear out form

            setCommentForm({
              owner: "",
              date: "",
              comment: "",
              blog: "",
            })
            navigate('/blogs')
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <section>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>


            {/* {date} */}
            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Today's date</label>
            <input className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={commentForm.date} name="date" placeholder="Enter todays date" />

            {/* {comment} */}
            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">Enter Coomment</label>
            <textarea className="border py-2 px-3 text-grey-darkest" onChange={handleChange} type="text" value={commentForm.comment} name="content" placeholder="Enter the content of this post" />

            <button className="block bg-teal hover:bg-teal-dark text-white uppercase text-lg mx-auto p-4 rounded">Create Comment</button>
        </form>
    </section>
  )
}
export default withAuthenticationRequired(CommentForm, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
