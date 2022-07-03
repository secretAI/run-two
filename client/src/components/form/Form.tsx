import React, { createRef, FormEvent } from "react";
import { IPost } from "./interfaces";
import pinIcon from "../../assets/thumbtacks.png";
import "../../styles/Form.css";

const Form = () => {
  const titleRef = createRef<HTMLInputElement>();
  const bodyRef = createRef<HTMLTextAreaElement>();

  const createNewPost = (event: FormEvent<HTMLFormElement>): IPost => {
    event.preventDefault();

    return {
      title: titleRef.current.value,
      body: bodyRef.current.value,
      author: localStorage.getItem("usr"),
      created_at: new Date()
    };
  }

  return(
    <form className="form" onSubmit={ createNewPost }>
      <input 
        type="text" 
        className="form-title" 
        placeholder="Title" 
        ref={ titleRef }/>
      <textarea 
        className="form-body" 
        placeholder="How's your day?" 
        ref={ bodyRef }/>
      <div className="form-buttons">
        <button className="form-send">
            Publish
          </button>
        <input 
          type="file" 
          id="file" 
          className="form-file"
          accept="image/*, video/mp4" 
        />
        <label htmlFor="file">
          <img src={ pinIcon } alt="Pin" className="form-icon" />
        </label>
      </div>
    </form>
  )
}

export default Form;