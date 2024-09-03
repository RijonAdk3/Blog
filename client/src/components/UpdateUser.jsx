import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



const UpdateUser = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        address: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        dob: '',
        profile: null, // Initialize profile as null
    });

    console.log( formData, 6);


    const fetchData = async (e) => {
        await axios.get(`http://localhost:5550/api/user/${id}`).then((res) =>{
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
        setFormData((prev) => ({ ...prev, profile: e.target.files[0] }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.put(`http://localhost:5550/api/user/${id}`,formData,{
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
                <h1 className="text-center font-bold text-3xl">Update User</h1>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-[14px] leading-[20px]">
                        Full Name
                    </label>
                    <input
                        name="f_name"
                        id="fullname"
                        type="text"
                        value={formData.f_name}
                        onChange={handleChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-[14px] leading-[20px]">
                        Last Name
                    </label>
                    <input
                        name="l_name"
                        id="lastname"
                        type="text"
                        value={formData.l_name}
                        onChange={handleChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-[14px] leading-[20px]">
                        Address
                    </label>
                    <input
                        name="address"
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-[14px] leading-[20px]">
                        Email
                    </label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-[14px] leading-[20px]">
                        Password
                    </label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-[14px] leading-[20px]">
                        Phone
                    </label>
                    <input
                        name="phone"
                        id="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-[14px] leading-[20px]">
                        Gender
                    </label>
                    <input
                        name="gender"
                        id="gender"
                        type="text"
                        value={formData.gender}
                        onChange={handleChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-[14px] leading-[20px]">
                        Date Of Birth
                    </label>
                    <input
                        name="dob"
                        id="dob"
                        type="text"
                        value={formData.dob}
                        onChange={handleChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="profile" className="font-medium text-[14px] leading-[20px]">
                        Profile
                    </label>
                    <input
                        name="profile"
                        id="profile"
                        type="file"
                        onChange={handleFileChange}
                        className="border-2 border-[#5c5c5c] outline-none py-2 px-3 rounded-sm text-[14px] leading-[20px]"
                    />
                </div>

                <button type="submit" className="bg-[#437EF7] text-white py-3 rounded-sm font-semibold tracking-wide">
                    Update User
                </button>
            </form>
        </div>
    );
};

export default UpdateUser;
