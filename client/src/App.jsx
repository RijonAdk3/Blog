import {Route, Router, Routes} from 'react-router-dom';
import './App.css'
import AddUser from './components/AddUser'
import UpdateUser from './components/UpdateUser'
import Table from './components/Table';
import AddBlog from './components/AddBlog';
import UpdateBlog from './components/UpdateBlog';
import BlogTable from './components/BlogTable'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Table/>}/>
        <Route path="/add-user" element={<AddUser/>}/>
        <Route path="/add-blog" element={<AddBlog/>}/>
        <Route path="/update/:id" element={<UpdateUser/>}/>
        <Route path="/updateBlog/:id" element={<UpdateBlog/>}/>
        <Route path="/table" element={<BlogTable/>}/>

        
      </Routes>

      
    </>
  )
}

export default App
