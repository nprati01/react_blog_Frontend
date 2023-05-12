import * as commentAPI from './comment-api'

export async function getComments(){
    try {
        const data = await commentAPI.index()
       

        return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function createComment(data){
    try {
        const commentData = await commentAPI.create(data)
        return commentData

    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}
