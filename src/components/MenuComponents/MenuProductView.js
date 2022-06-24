import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Avatars from './Avatars';
import MenuBtn from './MenuBtn';
// import RadioBtns from './RadioBtns';
const ProductViewHeader = {
   borderBottom: "1px solid #c7c7c7",
   minHeight: "52px"
}
const AccordianIcons = {
   width: "36px",
   height: "25px !important",
   marginLeft: '24px'
}

const MenuProductView = (props) => {





   return (
      <div className="Accordians">
         <Accordion style={{ borderRadius: "0px" }} onChange={props.onChanged} expanded={props.expanded}>
            <AccordionSummary id="productViewBtn" tabIndex="1"
               expandIcon={<ExpandMoreIcon />} style={ProductViewHeader} >
               <Typography id="productviewass" className="accordion-headers AccordiansHeader" style={{ fontWeight: "700",margin: "0px 0px" }}>{props.name}</Typography>
            </AccordionSummary >
            <AccordionDetails tabIndex="1" aria-label="Front" id="frontBtn" onKeyPress={props.onFrontBtnClick} onClick={props.onFrontBtnClick}>
               <MenuBtn aria-hidden="true" style={AccordianIcons} submenu="Front" subname={window.finalLangues.front} submenu={window.finalLangues.front} source={props.imgfront} />
            </AccordionDetails>
            <AccordionDetails tabIndex="1" aria-label="Back" id="backBtn" onKeyPress={props.onFrontBtnClick} onClick={props.onBackBtnClick}>
               <MenuBtn aria-hidden="true" style={AccordianIcons} submenu="Back" subname={window.finalLangues.front} submenu="Back" source={props.imgback} />
            </AccordionDetails>
            <AccordionDetails tabIndex="1" aria-label="Left" id="rightBtn" onKeyPress={props.onRightBtnClick} onClick={props.onRightBtnClick}>
               <MenuBtn aria-hidden="true" style={AccordianIcons} submenu="Left" subname={window.finalLangues.left} submenu={window.finalLangues.left} source={props.imgright} />

            </AccordionDetails>
            <AccordionDetails tabIndex="1" aria-label="Right" id="leftBtn" onKeyPress={props.onLeftBtnClick} onClick={props.onLeftBtnClick}>
               <MenuBtn aria-hidden="true" style={AccordianIcons} sunMenu="Right" subname={window.finalLangues.right} submenu={window.finalLangues.right} source={props.imgleft} />
            </AccordionDetails>
            <AccordionDetails tabIndex="1" aria-label="Top" id="topBtn" onKeyPress={props.onTopBtnClick} onClick={props.onTopBtnClick}>
               <MenuBtn aria-hidden="true" style={AccordianIcons} submenu="Top" subname={window.finalLangues.top} submenu={window.finalLangues.top} source={props.imgtop} />
            </AccordionDetails>
            <AccordionDetails tabIndex="1" aria-label="Bottom" id="bottomBtn" onKeyPress={props.onBottomBtnClick} onClick={props.onBottomBtnClick}>
               <MenuBtn aria-hidden="true" style={AccordianIcons} sunMenu="Bottom" sunmenu="Bottom" subname="Bottom" submenu={window.finalLangues.bottom} source={props.imgbottom} />
            </AccordionDetails>

         </Accordion>
      </div>
   );
}

export default MenuProductView;