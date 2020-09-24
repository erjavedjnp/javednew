import React from "react"
import "./comment.css"


const Comment = (props) =>{
    return(
       <div className="comment">
       {props.content}

       </div>
    )
}

export default Comment;