import { WallProps } from "./interfaces";

const Item = (props: WallProps) => {
  console.log(props);
  
  return (
    <div id="item">
      <div className="element"> 
        id: {props.post.id}
      </div>
      <div className="element"> 
        title: {props.post.title}
      </div>
      <div className="element"> 
        body: {props.post.body}
      </div>

      {/* <div className="element"> title: {props.post.title}</div>
      <div className="element"> body: {props.post.body}</div>
      <div className="element"> created_at: {props.post.created_at}</div> */}
    </div>
  )
};

export default Item;
