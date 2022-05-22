import CanvasDraw from "react-canvas-draw";
import { useRef, useState } from 'react'


const Draw = () => {

  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState();

  // const current = canvasRef.current;

  const handleExport = () => {
    const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    setDrawing(base64);
    console.log(base64)
  };



  return (
    <>

    <button
      type="button"
      style={{ backgroundColor: "#0A71F1", color: "white" }}
      onClick={handleExport}
      >
      Export Drawing
    </button>
    <br />
    <img src={drawing} alt="exported drawing" />
    <CanvasDraw
      brushColor="#300"
      canvasHeight={700}
      canvasWidth={700}
      hideGrid="true"
      brushRadius={10}
      ref={canvasRef}
      imgSrc={"drawing"}
      // onChange={handleChange}


      style={{
        borderRadius: '8px',
        boxShadow:
          "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
      }}

      ></CanvasDraw>    
 
    </>
    
    
    // <CanvasDraw
    //   brushColor="#300"
    //   canvasHeight={700}
    //   canvasWidth={700}
    //   hideGrid="true"
    //   brushRadius={10}
    //   ref={canvasRef}
    //   onChange={handleChange}


    //   style={{
    //     borderRadius: '8px',
    //     boxShadow:
    //       "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
    //   }}


    // 
  )

}
export default Draw;