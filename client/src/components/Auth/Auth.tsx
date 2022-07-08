import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css"

function Auth() {
  const redirect = useNavigate();

  return(
    <div className="a-wrapper">
      <h1 className="header">
        Auth to Proceed
      </h1>
      <div className="buttons">
        <button className="preauth-btn" id="signup" onClick={() => redirect("/signup")}>
          <h1 className="title">
            New Account
          </h1>
          <p className="body">
            Follow 2 simple steps -<br/> get a fresh-ass account today
          </p>
        </button>
        <button className="preauth-btn" id="login" onClick={() => redirect("/login")}>
          <h1 className="title">
            Log In
          </h1>
          <p className="body">
            Already have an account?<br/> Welcome!
          </p>
        </button>
      </div>
    </div>
  )
}

export default Auth;
