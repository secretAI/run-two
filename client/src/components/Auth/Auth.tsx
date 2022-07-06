import React from "react";

function Auth() {
  return(
      <div className="wrapper">
        <div className="buttons">
          <button className="button">
            <h1 className="title">
              New Account
            </h1>
            <p className="body">
              Follow 2 simple steps -<br/> get a fresh-ass account today
            </p>
          </button>
          <button className="button">
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
