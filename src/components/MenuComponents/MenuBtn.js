import React from 'react';
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

const Btn = {
   borderRadius: "0px",
   background: 'transparent',
   border: 'none',
   boxShadow: 'none',
   marginLeft: '10px',
   color: '#000',
   textTransform: 'capitalize',
   marginRight: "12px"
}
//  const Btn:hover {
//   font-weight: bold;
//   background-color: #d2dde4;
// }
const BtnIcon = {
   borderRadius: "0px",
   background: 'transparent',
   width: '52px'
}
//height: '36px'
const MenuBtn = (props) => {

   //console.log(props);
   return (
      <div className="menubtn">
         <Button tabIndex="-1" className="Btnsubmenu" style={Btn} variant="contained" color="secondary" startIcon={<Avatar style={{ ...BtnIcon,height: props.subname == 'Left' || props.subname == 'Right' ? '55px' : '36px' }} src={props.source} />}>{props.submenu}</Button>
      </div>
   )
}
export default MenuBtn;