import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";
import { Post } from "../components/Wall/interfaces";
import Item from "../components/Wall/Item";

const MainPage = () => {
  const posts: Post[] = [];
  const redirect = useNavigate();

  useEffect(() => {
    if(!isLoggedIn()) 
      redirect("/getstarted");
  });

  function isLoggedIn() {
    return !!localStorage.getItem("SSN");
  }

  return(
    <div id="main">
      <Form/>
      <Item post={posts[0]}/>
    </div>
  )
}

export default MainPage;