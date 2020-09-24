import React, { useState } from "react";
import "./App.css"
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import imgsrc from "./BlackPNG.png"
import Webcam from "react-webcam";
import { Flag } from "@material-ui/icons";
import Comment from "./comment"


const App = () =>{

  const [cameraon, setcamera] = useState(false);
  const [comment, setcomment] = useState("");
  const [arr, setArr] = useState([]);

  let height = 350;
  let width= 400;

  if(window.screen.width<=500)(
    width = 250
    
  )
  if(window.screen.width<=500){
    height = 250
  }

  const setRef = webcam => {
     webcam = webcam;
  };

 const capture = () => {
   setcamera(true)
   console.log(window.screen.width)
   
  };
  const end = () =>{
    setcamera(false)
    console.log(window.screen.width)
  }
  const commentChangeHandler = (event) =>{
    const {value} = event.target;
    setcomment(value);

  }

  const addcommentHandler = (event) =>{
    event.preventDefault();

    setArr(e =>{
      return [...arr,comment]
    })
    setcomment(" ");

  }



 const videoConstraints = {
      width: 900,
      height: 1000,
      facingMode: "user"
    };

const form = <form>
               <div className="textarea" style={{display: "flex",justifyContent:"center"}}>
               <textarea style={{width: 500}} placeholder="ADD A COMMENT...." onChange={commentChangeHandler} value={comment}/>
     
                 <Fab color="yellow" onClick={addcommentHandler}>
                    <SendIcon htmlColor="#C49A22" />
                </Fab>
                </div>
             </form>

let camera = null;
if(cameraon){
 camera = <Webcam
          audio={true}
          height={height}
          ref={setRef}
          screenshotFormat="image/jpeg"
          width={width}
          videoConstraints={videoConstraints}
        /> 
}
let note = null;
if(arr){
  note = arr.map((element,index) =>{
    return <Comment key={index} content={element} />
  })
}
  return(
<div className="main" >
  
  <header className="header">
  <div style={{display:"flex" , justifyContent: "space-between"}}>
 <div> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg> {cameraon?<button className="button1">live</button>:null}</div>

<img src={imgsrc} class="logo" alt="logo" />

</div>
  </header>
  {cameraon?<div style={{alignItems:"center",textAlign:"center"}}><button className="button2" onClick={end}>End live</button></div>:
  <div style={{alignItems:"center",textAlign:"center"}}><button className="button2" onClick={capture}>Go live</button></div>}
    <div className="webcam">
      <div className="video">{camera}</div>
      
      <br></br>
     {cameraon?form: null} 
     
     {cameraon? note: null}
     
     
    </div>
</div>
  );
}

export default App;