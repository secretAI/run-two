import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../http/http";
import "../../styles/LoginSignUp.css"

function SignUp() {
  const redirect = useNavigate();

  async function signUp() {
    if(pass !== rePass) {
      const message: string = "Passwords do not match"
      setErr(message);
      throw new Error(message);
    }
    try {
      const account = await http.post("/auth/signup", {
        email: email,
        password: pass
      });
      if(account) {
        redirect("/activation")
        localStorage.setItem("USR", email);
      }
    } catch(error: any) {
      setErr(`${error.response.data}`);
    }
  }

  const [ email, setEmail ] = useState("");
  const [ pass, setPass ] = useState("");
  const [ rePass, setRePass ] = useState("");
  const [ err, setErr ] = useState("");

  return(
    <div className="s-wrapper">
      <h1 className="header">
        Sign Up
      </h1>
      <input 
        type="text" 
        className="auth-data" 
        placeholder="Email"
        id="email" 
        onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}/>
      <input 
        type="password" 
        className="auth-data" 
        placeholder="Password"
        id="pass" 
        onChange={(event: ChangeEvent<HTMLInputElement>) => setPass(event.target.value)}/>
      <input 
        type="password" 
        className="auth-data" 
        placeholder="Password again"
        id="repass" 
        onChange={(event: ChangeEvent<HTMLInputElement>) => setRePass(event.target.value)}/>
      <button className="auth-btn" id="signup" onClick={signUp}>Submit</button>
      <a href="/login" className="redirect">
        Already have an account?<br/> Welcome!
      </a>
      <p className="err" id="err">
        {err}
      </p>
    </div>
  )
}

export default SignUp;