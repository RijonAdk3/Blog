import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Table = () => {
  const [data, setData] = useState([]);
  

  // wait for the data and go in the next line of code
  const fetchData = async () => {
    await axios.get("http://localhost:5550/api/user")
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
    axios.delete(`http://localhost:5550/api/user/${id}`) .then(
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
          to="/add-user" 
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Add User
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th className='border-2 border-black'>First Name</th>
            <th className='border-2 border-black'>Last Name</th>
            <th className='border-2 border-black'>Address</th>
            <th className='border-2 border-black'>Email</th>
            <th className='border-2 border-black'>Password</th>
            <th className='border-2 border-black'>Phone</th>
            <th className='border-2 border-black'>Gender</th>
            <th className='border-2 border-black'>Date Of Birth</th>
            <th className='border-2 border-black'>Profile</th>
            <th className='border-2 border-black'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className='border-2 border-black'>{item.f_name}</td>
              <td className='border-2 border-black'>{item.l_name}</td>
              <td className='border-2 border-black'>{item.address}</td>
              <td className='border-2 border-black'>{item.email}</td>
              <td className='border-2 border-black'>{item.password}</td>
              <td className='border-2 border-black'>{item.phone}</td>
              <td className='border-2 border-black'>{item.gender}</td>
              <td className='border-2 border-black'>{item.dob}</td>
              <td className='border-2 border-black'>
                <img src={`http://localhost:5550/${item.profile}`} alt="Profile" className="w-10 h-10 object-cover" />
              </td>
              <td className='border-2 border-black'>
                <Link to={`update/${item.user_id}`}>
                  <button className='bg-green-400 p-2 px-4 rounded-md' >Update</button>
                </Link>
                <button className='bg-red-400 p-2 px-4 rounded-md'
                onClick={()=> handleDelete(item.user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
