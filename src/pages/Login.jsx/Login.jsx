import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/Logo.png'
import { login, signup } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent form from refreshing the page
    setError("") // Clear any previous errors

    const user_auth = async ()=>{
      if(signState==="Sign In"){
        await login(email, password);
      }else{
        await signup(name, email, password);
      }
    }
    
    try {
      if (signState === "Sign In") {
        await login(email, password)
        navigate('/')
      } else {
        await signup(name, email, password)
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="Netflix Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState==="Sign Up"?
          <input value={name} onChange={(e)=>{setName(
            e.target.value)}} tye="text" placeholder='Your name' />:<></>}
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}}
            type="email" placeholder='Email'/>
             <input value={password} onChange={(e)=>{setPassword(e.target.value)}}
            type="password" placeholder='password'/>
            <button onClick={user_auth} type='submit'>{signState}</button>
            <div className="form-help">
              <div className="rememver">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>        
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>New to Netflix? <span onClick={() => {setSignState("Sign Up")}}>Sign Up Now</span></p>
          ) : (
            <p>Already have an Account <span onClick={() =>{setSignState("Sign In")}}>Sign In Now</span></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
