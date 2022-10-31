import React,{ useState,useEffect } from "react"
import { Grid } from '@material-ui/core'
import Switch from '@material-ui/core/Switch';
import Hidden from '@material-ui/core/Hidden';

const Animationbtns = {

   textAlign: "center",marginTop: "15px",position: "relative",marginRight: "20px",
   display: "flex",justifyContent: "center",alignItems: "center"

}

const animText = {
   fontSize: '16px',
   textAlign: 'right',display: 'block'
}

const AnimationBtn = (props) => {



   return (
      <>

         <div className="animationoff" id="animation" style={{ ...Animationbtns,marginTop: '30px' }}>
            <Grid container style={{ alignItems: 'center' }}>
               <Grid item xs={8} id="animation">
                  <span style={animText}>{window.finalLangues.animations}: </span>
               </Grid>
               <Grid item xs={4}>
                  <label className="switch" tabIndex="1" id="animswtich" onKeyPress={props.forKeypress} >
                     <input tabIndex="-1" className="tabIndexStyle" name='animationOnOff' id="animSwitchValue" onChange={props.onchange} type="checkbox" />
                     <span className="tabIndexStyle slider round"></span>
                     <span className="onOff"></span>
                  </label>
               </Grid>
            </Grid>
         </div>
         {!(window.mob) &&

            <div className="onscreencontrol" id="animation1" style={{ ...Animationbtns }}>
               <Grid container style={{ alignItems: 'center' }}>
                  <Grid item xs={8} id="animation1">
                     <span style={animText}>{window.finalLangues.onScreenControls}: </span>
                  </Grid>
                  <Grid item xs={4}>
                     <label className="switch" tabIndex="1" id="animswtich1" onKeyPress={props.forKeypress1} >
                        <input tabIndex="-1" className="tabIndexStyle" name='keyboadrControlsOnOff' id="animSwitchValue1" onChange={props.onchange1} type="checkbox" />
                        <span className="tabIndexStyle slider round" ></span>
                        <span className="onOff1"></span>
                     </label>
                  </Grid>
               </Grid>
            </div>
         }
      </>
   )
}

export default AnimationBtn;