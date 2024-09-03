import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



const UpdateBlog = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        blog_img: null,
        user_id: '' // Include user_id in formData
    });


    console.log( formData, 6);


    const fetchData = async (e) => {
        await axios.get(`http://localhost:5550/api/blog/${id}`).then((res) =>{
            // comes in array
            setFormData(res.data[0]);
            console.log("Fetched Data: ", res.data); // Log the data
        }).catch((err) =>{
            console.log("Error: ",err);
            
        })
    };

    useEffect(() => {
        fetchData();
    }, [id]);


    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, blog_img: e.target.files[0] }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.put(`http://localhost:5550/api/blog/${id}`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) =>{
            
            console.log(res.data);
            navigate('/');
        }).catch((err) =>{
            console.log("Error: ",err);
            
        })
       
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f3f3f3]">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[343px] md:max-w-[550px] flex flex-col gap-5 bg-white p-6 md:p-8 rounded-md shadow-lg shadow-slate-300"
            >
                <h1 className="text-center font-bold text-3xl">Add Blog</h1>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-[14px] leading-[20px]">Title</label>
                    <input
                        name="title"
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-[14px] leading-[20px]">Description</label>
                    <input
                        name="description"
                        id="description"
                        type="text"
                        value={formData.description}
                        onChange={handleChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="blog_img" className="font-medium text-[14px] leading-[20px]">Blog Image</label>
                    <input
                        name="blog_img"
                        id="blog_img"
                        type="file"
                        onChange={handleFileChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-[14px] leading-[20px]">User ID</label>
                    <input
                        name="user_id"
                        id="user_id"
                        type="text"
                        value={formData.user_id}
                        onChange={handleChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <button type="submit" className="bg-[#437EF7] text-white py-3 rounded-sm font-semibold tracking-wide">
                    Add Blog
                </button>
            </form>
        </div>
    );
};

export default UpdateBlog;
