import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";

function MainPage() {
  function isLoggedIn() {
    return !!localStorage.getItem("SSN");
  }
  const redirect = useNavigate();
  useEffect(() => {
    if(!isLoggedIn()) 
      redirect("/gateaway");
  });

  return(
    <div id="main">
      <Form/>
    </div>
  )
}

export default MainPage;