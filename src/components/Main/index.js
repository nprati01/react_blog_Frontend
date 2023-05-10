import {Routes, Route} from 'react-router'

import Blogs from '../Blogs'
import Show from '../Show'
import Edit from '../Edit'

export default function Main(props){
    return (
    <main>
        <Routes>

            <Route path="/blogs" element={<Blogs/>}/>
            <Route path="/blogs/:id" element={<Show/>}/>
            <Route path="/blogs/:id/edit" element={<Edit/>}/>

        </Routes>
    </main>
    )
}
