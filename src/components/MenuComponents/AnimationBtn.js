import React,{ useState,useEffect } from "react"
import Switch from '@material-ui/core/Switch';
import Hidden from '@material-ui/core/Hidden';

const Animationbtns = {
   textAlign: "center",marginTop: "30px",position: "relative",margin: "30px 0px 14px 3px"
}

const AnimationbtnsMob = {
   textAlign: "center",marginTop: "25px",position: "relative",marginBottom: "14px"

}
const Animationbtns1 = {
   textAlign: "center",position: "relative",margin: "0 0 14px",marginBottom: "14px",
   marginRight: "6px"
}
/* const AnimSpan = {
   flex: ' 0 0 60%',
   maxWidth: '60%',
   display: 'inline-block',
   verticalAlign: 'middle',
   textAlign: 'left',
} */
const AnimationBtn = (props) => {

   return (
      <>

         <div id="animation" style={Animationbtns}>
            <span>{window.finalLangues.animations}: </span>
            {/* <Switch id="switchValue" onChange={displayName} name="checkedA" color="primary"/><span className = 'onOff'>{value}</span> */}
            <label className="switch" tabIndex="1" id="animswtich" onKeyPress={props.forKeypress} >
               <input tabIndex="-1" className="tabIndexStyle" name='animationOnOff' id="animSwitchValue" onChange={props.onchange} type="checkbox" />
               <span className="tabIndexStyle slider round" ></span>
               <span className="onOff"></span>
            </label>
         </div>
         {
            <div id="animation1" style={Animationbtns1} >
               <span>{window.finalLangues.onScreenControls}: </span>
               {/* <Switch id="switchValue" onChange={displayName} name="checkedA" color="primary"/><span className = 'onOff'>{value}</span> */}
               <label className="switch" tabIndex="1" id="animswtich1" onKeyPress={props.forKeypress1} >
                  <input tabIndex="-1" className="tabIndexStyle" name='keyboadrControlsOnOff' id="animSwitchValue1" onChange={props.onchange1} type="checkbox" />
                  <span className="tabIndexStyle slider round" ></span>
                  <span className="onOff1"></span>
               </label>
            </div>
         }

      </>
   )
}

export default AnimationBtn;