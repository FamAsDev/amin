import { useState, useEffect } from "react";

const WinSizeApi = () => {

  // window size
  const [ WinWidth , setWinWidth] = useState(window.innerWidth)
  
  useEffect(()=>{
      const handleResize = () => {
          setWinWidth(window.innerWidth)
      }

      window.addEventListener('resize' , handleResize )

      return () => {
          window.removeEventListener('resize' , handleResize )
      }
      
  })

  return {
    winSize: [ WinWidth , setWinWidth]
  };
};

export default WinSizeApi;
