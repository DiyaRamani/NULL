import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import 'plyr/dist/plyr.css'; // Import Plyr styles
import Plyr from 'plyr';
import { useParams } from 'react-router-dom';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';

function Videoplayer({ slideIn, handleSlideIn }) {
  const {vid} = useParams();
  //console.log(vid)
  const vids = useSelector((state) => state.videoReducer);
  //console.log(vids)
  const vv = vids?.data.filter((q) => q._id === vid)[0];
  //console.log(vv)
  const player = useRef(null);

  useEffect(() => {
    if (player.current) {
        const plyr = new Plyr(player.current,{fullscreen:{ enabled: false, fallback: false, },clickToPlay:false});

        plyr.on('dblclick',(e)=>{
          //console.log(e.clientX)
          const rect = e.target.getBoundingClientRect();
          const left = rect.left;
          const right = rect.right;
          if(e.clientX < left + 300) {plyr.rewind(10)}
          else if(e.clientX < right - 300 && e.clientX > left+300 ) {plyr.togglePlay()}
          else if(e.clientX > right - 300) {plyr.forward(10)} 
        })
    }
}, []);
  
  return (
  <div className="home-container-1">
    <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
  <div className="home-container-2" style={{ marginTop: "30px" }}>
    <div style={{marginTop:'50px'}}>
      <h1 onClick={(e) =>{console.log(e.clientX)}}>
        video player {/* {vv.filePath} */}
      </h1>
      <div style={{ width: '800px', height: '450px' }}>
          <video controls ref={player}  >
            <source src={`https://intern-f7feadbf478c.herokuapp.com/${vv.filePath}`} type="video/mp4" />
          </video>
      </div>
    </div>
    </div>
    </div>
  );
}


export default Videoplayer;
