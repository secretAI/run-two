import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../http/http";
import "../../styles/LoginSignUp.css"

function Login() {
  const redirect = useNavigate();

  async function login() {
    const errElem: HTMLElement = document.getElementById("err")
    try {
      const session = await http.post("/auth/login", {
        email: email,
        password: pass
      });
      if(session) {
        localStorage.setItem("SSN", session.data.access);
        localStorage.setItem("REF", session.data.refresh);
        redirect("/");
        window.location.reload();
      }
    }
    catch(error: any) {
      errElem.style.opacity = "100%";
      setErr(`${error.response.data}`);
      setTimeout(() => {
        errElem.style.opacity = "0";
      }, 5000);
    }
  }

  const [ email, setEmail ] = useState("");
  const [ pass, setPass ] = useState("");
  const [ err, setErr ] = useState("");

  return(
    <div className="s-wrapper">
      <h1 className="header">
        Login
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
      <button className="auth-btn" id="signup" onClick={login}>Submit</button>
      <a href="/signup" className="redirect">
        Create Free Account
      </a>
      <p className="err" id="err">
        {err}
      </p>
    </div>
  )
}

export default Login;