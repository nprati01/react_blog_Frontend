import {useState, useEffect} from 'react'
import { getBlogDetails } from '../../utils/blog-services'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

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

    const loaded = () => {
        return (
            <>
              <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
                <div className="relative overflow-hidden shadow-md mb-6">
                  <img src={blog.image} alt="" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
                </div>
                <div className="px-4 lg:px-0">
                  <div className="flex items-center mb-8 w-full">
                    <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
                      {/* <img
                        alt={post.author.name}
                        height="30px"
                        width="30px"
                        className="align-middle rounded-full"
                        src={post.author.photo.url}
                      /> */}
                      <p className="align-middle text-gray-700 ml-2 font-medium text-lg">{blog.author}</p>
                    </div>
                    <div className="font-medium text-gray-700 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="align-middle"><Moment format='MMM DD, YYYY'>{blog.date}</Moment></span>

                    </div>
                  </div>
                  <h1 className="mb-8 text-3xl font-semibold">{blog.title}</h1>
                  <p>{blog.content}</p>
                </div>
              </div>
              <Link to={`/blogs/${blog._id}/edit`}><button>Edit Blog</button></Link>


            </>
          );
        };


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
