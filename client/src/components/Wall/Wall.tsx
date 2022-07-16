import { Post } from "./interfaces";
import Item from "./Item";

const Wall = (posts: Post[]) => {
  return(
    <div className="w-wrapper">
      {posts.map((post: Post) => 
        <Item post={post}/>)}
    </div>
  )
};

export default Wall;
