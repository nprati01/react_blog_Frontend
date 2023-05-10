import * as blogAPI from './blog-api'

export async function getBlogs(){
    try {
        const data = await blogAPI.index()
        return data
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function createBlog(data){
    try {
        const blogData = await blogAPI.create(data)
        return blogData
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function getBlog(id){
    try {
        const blogData = await blogAPI.detail(id)
        return blogData
    } catch (err) {
        throw new Error(err)
    }


}

export async function deleteBlog(id){
    try {
        const deletedBlog = await blogAPI.destroy(id)
        return deletedBlog
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function updateBlog(id, data){
    try {
        const updatedBlog = await blogAPI.update(id, data)
        return updatedBlog
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}
