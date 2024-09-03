import React , {useState} from 'react';

const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{
    const storedUser = localStorage.getItem("user")

    let initialUser = null;

    try{
        storedUser ? JSON.parse(storedUser):null;;

    }catch (error){
        console.log(err)
    }

    const [user, setUser] = useState(initialUser)

    const login =async (formData) =>{
        await axios.post("http://localhost:5550/api/login", formData)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
}