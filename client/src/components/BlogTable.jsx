import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Table = () => {
  const [data, setData] = useState([]);
  

  // wait for the data and go in the next line of code
  const fetchData = async () => {
    await axios.get("http://localhost:5550/api/blog")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // put data of use state here to refresh instead of refresh
  useEffect(() => {
    fetchData();
  }, [data]);



  const handleDelete = (id) => {
    axios.delete(`http://localhost:5550/api/blog/${id}`) .then(
      (res) =>{
        console.log(res);
      }
    ).catch((err)=>{
      console.log(err)
    })

  }

  return (
    <div className='w-full'>
      <div className="flex justify-between mb-4">
        {/* Replace button with Link */}
        <Link 
          to="/add-blog" 
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Add Blog
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th className='border-2 border-black'>Title</th>
            <th className='border-2 border-black'>Description</th>
            <th className='border-2 border-black'>Blog Image</th>
            <th className='border-2 border-black'>User ID</th>

            <th className='border-2 border-black'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className='border-2 border-black'>{item.title}</td>
              <td className='border-2 border-black'>{item.description}</td>
              

              <td className='border-2 border-black'>
                <img src={`http://localhost:5550/${item.blog_img}`} alt="Blog Image" className="w-10 h-10 object-cover" />
              </td>
              <td className='border-2 border-black'>{item.user_id}</td>
              <td className='border-2 border-black'>
                <Link to={`updateBlog/${item.blog_id}`}>
                  <button className='bg-green-400 p-2 px-4 rounded-md' >Update</button>
                </Link>
                <button className='bg-red-400 p-2 px-4 rounded-md'
                onClick={()=> handleDelete(item.blog_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
