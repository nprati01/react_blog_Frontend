import {Routes, Route} from 'react-router'
import BlogCreate from '../../pages/BlogCreate'
import Blogs from '../../pages/Blogs'
import Show from '../../pages/Show'
import Edit from '../../pages/Edit'


export default function Main(props){
    return (
    <main>
        <Routes>

            <Route path="/" element={<Blogs/>}/>
            <Route path="/blogs/create" element={<BlogCreate />}/>
            <Route path="/blogs/:id" element={<Show/>}/>
            <Route path="/blogs/:id/edit" element={<Edit/>}/>


        </Routes>
    </main>
    )
}
