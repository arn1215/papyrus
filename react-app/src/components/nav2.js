import { Link } from "react-router-dom";
import image from './Papyrus-logos_transparent.png'

const Nav2 = () => {
  return (
    <div className='nav-bar-two'>
      
      <img src={image} style={{height: '180px'}}></img>
      <div className="about">
        <a className='' href="https://github.com/arn1215">Github</a>
        <a href="https://www.linkedin.com/in/ali-naqvi-251910226/">Linked In</a>
      </div>
    </div>
  )
}


export default Nav2;