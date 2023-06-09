import {useState, useEffect} from 'react'
import { getBlogDetails } from '../../utils/blog-services'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { useAuth0 }from '@auth0/auth0-react'

export default function Show(props){
    const {id} = useParams()
    console.log("documentId", id)
    const [blog, setBlog] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const {user} = useAuth0()


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
    }, [useAuth0])

    const loaded = () => {

        return(


            <>
              <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8 lg:w-5/6 md:w-2/3 mx-auto">
                <div className="relative overflow-hidden shadow-md mb-6">
                  <img src={blog.image} alt="" className="object-top h-25 w-25 object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
                </div>
                <div className="px-4 lg:px-0">
                  <div className="flex items-center mb-8 w-full">
                    <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">

                      <p className="align-middle text-gray-700 ml-2 font-medium text-lg">Written By: {blog.author}</p>
                    </div>
                    <div className="font-medium text-gray-700 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="align-middle"><Moment format='MMM DD, YYYY'>{blog.date}</Moment></span>
                      <Link to={`/blogs/${blog._id}/edit`}><button className="ml-4 px-4 py-2 text-sm text-pink-600 font-semibold rounded-full border border-pink-200 hover:text-white hover:bg-pink-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2">Edit Blog</button></Link>

                    </div>
                  </div>
                  <h1 className="mb-8 text-3xl font-semibold">{blog.title}</h1>
                  <p>{blog.content}</p>


                </div>
              </div>



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
