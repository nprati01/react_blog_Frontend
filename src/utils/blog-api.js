
const BASE_URL= "https://nik-dev-blog.herokuapp.com/blogs"


export async function index(){
    try {
        const options = {
            method: 'GET'
        }
        const response = await fetch(BASE_URL, options)

        if(response.ok){
            return response.json()
        } else {
            throw new Error("Invalid Request")
        }
    } catch(err){
        console.log(err)
        return err
    }
}
export async function create(data){


    try {

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                

            },
            body: JSON.stringify(data)
        }

        const response = await fetch(BASE_URL, options)

        if(response.ok){
            return response.json()
        } else {
            throw new Error("Invalid POST Request")
        }

    } catch(err){
        console.log(err)
        return err
    }
}

export async function detail(id){
    try {
        const options = {
            method: 'GET'
        }
        const url = `${BASE_URL}/${id}`
        const response = await fetch(url, options)
        console.log(url)
        console.log(response)

        if(response.ok){
            return response.json()
        } else {
            throw new Error("Invalid Request")
        }
    } catch(err){
        console.log(err)
        return err
    }
}

export async function destroy(id){
    try {
        const options = {
            method: 'DELETE'
        }
        const url = `${BASE_URL}/${id}`
        const response = await fetch(url, options)

        if(response.ok){
            return response.json()
        } else {
            throw new Error("Invalid Request")
        }
    } catch(err){
        console.log(err)
        return err
    }
}

export async function update(id, data){
    try {
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const url = `${BASE_URL}/${id}`
        const response = await fetch(url, options)

        if(response.ok){
            return response.json()
        } else {
            throw new Error("Invalid POST Request")
        }

    } catch(err){
        console.log(err)
        return err
    }
}
