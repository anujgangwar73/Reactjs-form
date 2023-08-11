import React,{useEffect} from 'react'
import Header from './Header'
import { useNavigate } from "react-router-dom"


const Protected = (props) => {
    let Cmp = props.Cmp
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem("user-info")){
            navigate("/register")
        }
    },[])
    return (
        <>
        <div>
           <Cmp/>
        </div>   
        </>
    )
}

export default Protected