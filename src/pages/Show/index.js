import {useState, useEffect} from 'react'
import { getBlogDetails } from '../../utils/blog-services'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export default function Show(props){
    const {id} = useParams()
    console.log("documentId", id)
    const [blog, setBlog] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    async function handleRequest(){
        try {
            const blogData = await getBlogDetails(id)
            console.log(blogData)
            setBlog(blogData)
            setIsLoading(false)
        }catch(err){
            console.log(err)
        }
    }
    console.log(`Current blog: ${JSON.stringify(blog)}`)
    useEffect(()=>{
        handleRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loaded = () =>{
        return(
            <>
            <div className='Blog-content'>
                <img src={blog.image} alt="" />
                <h1>Blog Details</h1>
                <h2>{blog.title}</h2>
                <p>{blog.author}</p>
                <p>{blog.date}</p>
                <p>{blog.headline}</p>
                <p>{blog.content}</p>

            </div>

                <Link to={`/blogs/${blog._id}/edit`}><button>Edit Blog</button></Link>
            </>

        )
    }
    const loading = () => {
        return (
            <section className='blog-list'>
                <h1>
                    Loding...
                </h1>
            </section>

        )
    }


    return (
        <section className='Blog-section'>
         {isLoading ? loading() : loaded()}


        </section>
    )
}
