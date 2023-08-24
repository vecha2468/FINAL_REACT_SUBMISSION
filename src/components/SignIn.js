import {useFormik} from "formik"
import React from "react"
import * as Yup from 'yup'
import axios from 'axios'
import './style.css'
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


const initialValues={
    email:"",
    password:"",
}

const Validation =Yup.object({
    email: Yup.string().email("Please enter valid email").required("Enter Your Email"),
    password: Yup.string().min(8).required("Enter your password"),
})

const SignIn=()=>{
    const navigate=useNavigate()   
   const {values, errors, handleBlur, handleChange, handleSubmit, touched} = useFormik({
        initialValues:initialValues,
        validationSchema: Validation,
        onSubmit : async (values,action) => {            
            try{
                localStorage.clear()
                console.log(values)
                const res=await axios.post('http://127.0.0.1:3000/author/login',values)
                action.resetForm()
                const token=res.data.token
                localStorage.setItem('jwtToken', token)
                navigate('/')
            }
            catch(err){
                console.log('failed',err)
            }
        }
    });


    return(
        <div className="signin_cont">
           <h1>Sign In</h1>
         <form onSubmit={handleSubmit} className="signin_form">
            <label>Email :</label>       
           <input type="text" name="email" id="email" placeholder="enter your email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
            {(errors.email && touched.email)?(<span className="errors">{errors.email}</span>):null}
            <label>Password :</label>
           <input type="password" name="password" id="password" placeholder="Password" value={values.password} onChange={handleChange}
            onBlur={handleBlur}/>
            {(errors.password && touched.password)? (<span className="errors">{errors.password}</span>):null}
           <button  type="submit" className="signin_button">SignIn</button>
           <div >If You Dont have an account? </div> 
           <Link to='/signup'>SignUp</Link>        
        </form>        
    </div>
    )
}

export default SignIn