import { useState, useEffect } from 'react'
import { getComments } from '../../utils/comment-services'



export default function Comments(props) {

  const [comments, setComments] = useState(null)
  const [isLoading, setIsLoading] = useState(true)



  async function handleRequest(){
    try {
      const apiResponse = await getComments()
      setComments(apiResponse)
      console.log("this is the response from get comments",apiResponse)
      setIsLoading(false)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    handleRequest()
  }, [isLoading])

  const loaded = () => {
    return comments?.map((comment) => {
      return (
              <div key={comment._id}>
                <p>{comment.owner}</p>

                <p>{comment.comment}</p>
                <p>{comment.date}</p>


              </div>
      );
    });
    
  };

  const loading = () => (
    <div className="comment-list">
      <h1>
        Loading...

      </h1>
    </div>
  );





  return (

    <>
      {isLoading ?  loading() : loaded()}
    </>
  );
}
