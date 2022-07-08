import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../http/http";
import "../../styles/Activation.css"

const Activation = () => {
  const redirect = useNavigate();
  const [ err, setErr ] = useState("");

  async function checkActivation() {
    const errElem: HTMLElement = document.getElementById("err");
    const isActivated = await http.post("/auth/check/activation", {
      email: localStorage.getItem("USR")
    });
    console.log(isActivated);
    
    if(isActivated.data)
      redirect("/login");
    else {
      errElem.style.opacity = "100%";
      setErr("Account is not activated")
      setTimeout(() => {
        errElem.style.opacity = "0";
      }, 5000);
    }
  }

  return(
    <div className="act-wrapper">
      <h1 className="header">
        Activate account
      </h1>
      <p className="message">
        Follow the link sent to your email in order to activate your account
      </p>
      <button className="act-btn" onClick={checkActivation}>
        Check activation
      </button>
      <p className="err" id="err">
        {err}
      </p>
    </div>
  );
};

export default Activation;