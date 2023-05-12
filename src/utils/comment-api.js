const BASE_URL= "https://nik-dev-blog.herokuapp.com/comments"

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
                "Content-Type": "application/json"
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
