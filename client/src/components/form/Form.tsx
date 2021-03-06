import React, { FormEvent, useRef, useState, ChangeEvent } from "react";
import pinIcon from "../../assets/thumbtacks.png";
import { http } from "../../http/http";
import "../../styles/Form.css";
import { IPost } from "./interfaces";

const Form = () => {
  const [ title, setTitle ] = useState("");
  const [ body, setBody ] = useState("");
  const fileRef = useRef<HTMLInputElement>();

  const createNewPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const post: IPost = {
      title,
      body,
      user_email: localStorage.getItem("USR"),
      media: null
    };
    
    await http.post("/posts/new", { 
      title: title,
      body: body,
      user_email: localStorage.getItem("USR"),
      /* Finish creating a new post with this endpoint */ 
      image: fileRef.current.files[0]
    }, {
      headers: {
        "Content-type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem("SSN")}`
      }
    });
  }

  const logOut = async () => {
    await http.post("/auth/logout", {
      reToken: localStorage.getItem("REF")
    });
    localStorage.clear();
    window.location.reload();
  }

  return(
    <div className="f-wrapper">
      <button className="logout" onClick={ logOut }>
        Log Out
      </button>
      <form className="form" name="form" onSubmit={ createNewPost }>
        <input 
          type="text" 
          className="form-title" 
          placeholder="Title" 
          value={ title }
          onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}/>
        <textarea 
          className="form-body" 
          placeholder="How's your day?" 
          value={ body }
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setBody(event.target.value)}/>
        <div className="form-buttons">
          <button className="form-send">
              Publish
            </button>
          <input 
            type="file" 
            id="file" 
            className="form-file"
            accept="image/*, video/mp4" 
            ref={ fileRef }
          />
          <label htmlFor="file">
            <img src={ pinIcon } alt="Pin" className="form-icon" />
          </label>
        </div>
      </form>
    </div>
  )
}

export default Form;