import {useFormik} from "formik"
import React from "react"
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import './style.css'
import { Link } from "react-router-dom"

const initialValues={
    name:"",
    email:"",
    password:"",
}

const Validation =Yup.object({
    name:Yup.string().required("Enter FULL Name"),
    email: Yup.string().email("Please enter the  valid email").required("Enter Email"),
    password: Yup.string().min(8).required("Enter your  password"),
})



const SignUp=()=>{
    const navigate=useNavigate()
    
   const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
        initialValues:initialValues,
        validationSchema: Validation,
        onSubmit : async (values,action) => {
            try{
                localStorage.clear()
                const res=await axios.post('http://127.0.0.1:3000/create/author',values)
                console.log('signup success')
                action.resetForm();
                navigate('/signin')
            }
            catch(err){
                console.log(err)
            }                       
        }
    });

    return(
        <div className="signup_cont">
           <h1>Sign Up</h1>
         <form onSubmit={handleSubmit} className="signup_form">
            <label>Name :</label>
            <input type="text" name="name" id="name" placeholder="enter your name" value={values.name} onChange={handleChange}onBlur={handleBlur}/>
            {(errors.name && touched.name)?<span className="errors">{errors.name}</span>:null} 
            <label>Email :</label>       
           <input type="text" name="email" id="email" placeholder="enter your email" value={values.email}onChange={handleChange} onBlur={handleBlur}/>
            {(errors.email && touched.email)?<span className="errors">{errors.email}</span>:null}
            <label>Password :</label>
           <input type="password" name="password" id="password" placeholder="Password" value={values.password} onChange={handleChange}
            onBlur={handleBlur}/>
            {(errors.password && touched.password)? (<span className="errors">{errors.password}</span>):null}
           <button  type="submit">SignUp</button>
            <span>Already have an account? </span>    
            <Link to='/signin'>SignIn</Link>    
        </form>        
    </div>
    )
}

export default SignUp