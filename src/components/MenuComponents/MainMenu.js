import React,{ useState,useEffect } from 'react';
import MenuSelectProductType from './MenuSelectProduct';
import MenuProductView from './MenuProductView';
import MenuPositions from './MenuPosition';
import AnimationBtn from './AnimationBtn';
import MenuFeatures from './MenuFeatures';
// import MenuKeyboard from './MenuKeyboard';
import MenuColors from './MenuColors';
import Howtousenew from './Howtousenew';
import HowToUse from './HowToUse';
import FooterControl from './FooterControl';
import FooterControlMob from './FooterControlMob';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

// import MenuBtn from './MenuBtn';
// import { MicNone } from '@material-ui/icons';
var mob = (navigator.userAgent.indexOf("iPhone") != -1) || ((navigator.userAgent.indexOf("Android") != -1) || (navigator.userAgent.indexOf("Mobile") != -1)) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent == "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Safari/605.1.15");
var mobPortrait = (mob && window.innerHeight > window.innerWidth);
var moblandscap = (mob && window.innerWidth > window.innerHeight);
var isipad = navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && (navigator.userAgent.indexOf("iPhone") == -1);

export const userContext = React.createContext();
var prevCounter = 0;
var nextClicked = false;
var prevClicked = false;

var buttonSeq = ['onResetMode','onFrontClick','onBackClick','onRightClick','onLeftClick','onTopClick','onBottomClick','xpsFolioClick','xpsStylusClick'];
var buttonSeq180 = ['onResetMode','onFrontClick','onBackClick','onRightClick','onLeftClick','onTopClick','onBottomClick','xpsFolioClick','xpsStylusClick'];
var selectedButton = 'onResetMode';

var position = {
   'currentPos': 'reset',
   'close': 0,
   'nintyDegree': 4.1659,
   'reset': 0,
   'top': 5.000,
   'bottom': 5.829,
   'theatre': 4.1667,
   'tablet': 0.8330000,
}

const MainMenu = (props) => {
   const [expandedPanel,setExpandedPanel] = useState(false);
   const [displayed,setDisplayed] = useState(false);
   const [hidden,setHidden] = useState(true);
   const [kbType,setKbType] = useState('sky');


   const [laptop360FrontImg,setLaptop360FrontImg] = useState("./img/front180White.png");
   const [laptop360TopImg,setLaptop360TopImg] = useState("./img/top180White.png");
   const [laptop360LeftImg,setLaptop360LefttImg] = useState("./img/180_white_left.png");
   const [laptop360RightImg,setLaptop360RightImg] = useState("./img/180_white_right.png");
   const [laptop360BackImg,setLaptop360BackImg] = useState("./img/180_white_back.png");
   const [laptop360BottomImg,setLaptop360BottomImg] = useState("./img/180_white_Bottom.png");


   const [counter,setCounter] = useState(0);

   const handleAccordionChange = (panel) => (event,isExpanded) => {
      // console.log({ event,isExpanded });
      //setExpandedPanel(isExpanded ? panel  : false );
      if (isExpanded) {
         setExpandedPanel(panel);
         //console.log("shubham");
      } else {
         //  console.log("Pawar");
         setExpandedPanel(false)
      };
      // resetBacklitCloseImg();

   };
   const [camData,setCamData] = useState("");
   var animationSwitch = window.localStorage.getItem('Animation');
   var animTime = 1;
   var animTimes = 1;

   const getData = () => {
      fetch('./model_gl/config.json')
         .then(function (response) {
            return response.json();
         })
         .then(function (myJson) {
            // console.log(myJson.positions);
            setCamData(myJson.positions);
         });
   }

   useEffect(() => {
      getData();
      animationSwitch = window.localStorage.getItem('Animation');
      moblandscap = (mob && window.innerWidth > window.innerHeight);

      //window.localStorage.setItem('tent', false);
      //window.localStorage.setItem('tablet', false);
      //window.localStorage.setItem('theater', false);
      //window.localStorage.setItem('close', false);
      window.localStorage.setItem("position","reset");
      // document.querySelector('#xpsFolioClick').classList.add('Mui-disabled');
      // document.querySelector('#backlitBtn').classList.add('Mui-disabled');
      // document.querySelector('#backlitBtn').classList.add('Mui-disabled');
      // document.querySelector('#blackBtn').style.pointerEvents = 'none';
      document.getElementById('blackBtn').classList.add('select');
      // window.xmlhttp.open("GET", "locale.json", true);
      // window.xmlhttp.send();
      // alert('moblandscap '+moblandscap )
   },[]);

   useEffect((event) => {
      if (event) {
         if (event.keyCode === 13) {
            this.click();
         }
      }
   },[])

   //For Animation Switch 
   // console.log('animationSwitch anim', animationSwitch)

   if (animationSwitch == 'on') { animTime = 1000; animTimes = 2000 }
   else { animTime = 1; animTimes = 1 }
   // console.log('animTime', animTime)

   //new camera function
   const GotoPosInTimeNamedValue = (gotoposname,onComplete,onSample) => {
      // below code is updated in it.  
      // updated code ends here

      var opt = undefined,gp = camData[gotoposname];

      //    console.log(gp)
      if (gp.fovy && window.scene.fovy != gp.fovy)
         opt = { fovy: gp.fovy };
      if (gp.pos.length > 5) {
         if (!opt)
            opt = {};
         opt.zang = gp.pos[5];
      }
      // console.log(gotoposname);
      if (animationSwitch == 'off') {
         gp.time = 1
         // console.log('animationSwitch iffff', gp.time)
      }
      else {
         gp.time = animTime;
         // console.log('animationSwitch elseeee', gp.time)
      }
      console.log('animationSwitch',animationSwitch);
      console.log('gp.time',gp.time);
      // if (gotoposname == "Render_Cam_Top") {
      //    window.scene.gotoPosInTime(gp.pos[0],1.569380,gp.pos[2],gp.pos[3],gp.pos[4],gp.time,onComplete,slowInOut,opt);


      // }
      // else if (gotoposname == "Render_Cam_Bottom") {
      //    window.scene.gotoPosInTime(gp.pos[0],1.569380,gp.pos[2],gp.pos[3],gp.pos[4],gp.time,onComplete,slowInOut,opt);
      // }
      // else {
      window.scene.gotoPosInTime(gp.pos[0],gp.pos[1],gp.pos[2],gp.pos[3],gp.pos[4],gp.time,onComplete,slowInOut,opt);
      // }

      // console.log(gp.pos[0], gp.pos[1], gp.pos[2], gp.pos[3], gp.pos[4], gp.time, onComplete, onSample, opt);
   }
   //end
   const slowInOut = (x) => {
      var a = 2.1;
      var x2 = 1.0 - x;
      var px = Math.pow(x,a);
      var px2 = Math.pow(x2,a);

      return px / (px + px2);
   }
   const reversAnimAll = () => {
      if (window.scene.animIsPlaying('Stylus')) window.scene.getAnim("Stylus").stop();
      if (window.scene.animIsPlaying('Tablet')) window.scene.getAnim("Tablet").stop();
      if (window.scene.animIsPlaying('joint3')) window.scene.getAnim("joint3").stop();
      if (window.scene.animIsPlaying('joint4')) window.scene.getAnim("joint4").stop();
      if (window.scene.animIsPlaying('SPINE')) window.scene.getAnim("SPINE").stop();

      window.scene.animPlayAllChildrenInTime("Stylus",0,0);
      window.scene.animPlayAllChildrenInTime("Tablet",0,0);
      window.scene.animPlayAllChildrenInTime("joint3",0,0);
      window.scene.animPlayAllChildrenInTime("joint4",0,0);
      window.scene.animPlayAllChildrenInTime("SPINE",0,0);


      window.scene.clearRefine();

   }
   const reversAll = () => {
      window.scene._nav.SetRotationCenter([0,0,0]);
      window.scene.groupApplyState("Pen_OFF");
      window.scene.groupApplyState("Keyboard_OFF");
      window.scene.groupApplyState("Tab_Reflection_ON");
      window.localStorage.removeItem('features');
      if (window.storeData.currentState == "sky") {
         window.scene.groupApplyState("Millenio_5G_OFF");
         window.scene.groupApplyState("Millenio_WIFI_ON");
         setOpenClose("./img/Folio_W.png");
      }
      else if (window.storeData.currentState == "slate") {
         window.scene.groupApplyState("Millenio_WIFI_OFF");
         window.scene.groupApplyState("Millenio_5G_ON");
         setOpenClose("./img/Folio_B.png");
      }

      window.scene.animPlayAllChildrenInTime("Stylus",0,0);
      window.scene.animPlayAllChildrenInTime("Tablet",0,0);
      window.scene.animPlayAllChildrenInTime("joint3",0,0);
      window.scene.animPlayAllChildrenInTime("joint4",0,0);
      window.scene.animPlayAllChildrenInTime("SPINE",0,0);
      window.scene.clearRefine();
   }

   const resetBacklitCloseImg = () => {
      setOpenCloseOnOff(false);
      //// setOpenClose("./img/Folio_B.png");
      setBackliteOnOff(false);
      ///  setBacklite("./img/stylus_W.png");

      if (window.storeData.currentState == "sky") {

         setOpenClose("./img/Folio_W.png");
         console.log("sky se folio ");
      }
      else if (window.storeData.currentState == "slate") {
         setOpenClose("./img/Folio_B.png");
         console.log("slate se folio ");

      }

      // window.scene.materialReplace('LED_Backlit_ON_env', 'LED_Backlit_OFF_env');
      window.scene.clearRefine();

   }

   //MenuSelectProduct
   const [laptop360,setlaptop360] = useState(true);

   const [laptop180,setlaptop180] = useState(false);

   const laptopClick = (event) => {

      setlaptop180(true);
      setlaptop360(false);
      console.log(laptop180);
      setCounter(0);
      selectedButton = 'onResetMode';
      setValue(event.target.value);
      setDisplayed(true);
      // setExpandedPanel(false);
      setHidden(false);
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');

      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('laptop').setAttribute('aria-label','laptop radio butoon selected');
      window.scene.groupApplyState("screen_180");
      window.scene.groupApplyState("GP_open");
      window.scene.groupApplyState("dynamic_reset");
      window.scene.groupApplyState("screenfill_180");

      setLaptop360FrontImg("./img/front180White.png");
      setLaptop360TopImg("./img/top180White.png");
      setLaptop360LefttImg("./img/180_white_left.png");
      setLaptop360RightImg("./img/180_white_right.png");
      setLaptop360BackImg("./img/180_white_back.png");
      setLaptop360BottomImg("./img/180_white_Bottom.png");

      resetBacklitCloseImg();

      window.localStorage.setItem("position","reset");
      window.localStorage.setItem("laptop","laptop180");
      window.localStorage.removeItem('color');

      var radiobtn1 = document.getElementById('twoinoneRadio');
      radiobtn1.checked = false;
      var radioSelector1 = document.querySelector('#twoinoneRadio')
      var nextSibling1 = radioSelector1.nextElementSibling;
      var selectSVG1 = nextSibling1.lastChild;
      selectSVG1.style.transform = 'scale(0)'
      // nextSibling1.classList.remove('PrivateRadioButtonIcon-checked-16')
      var radiobtn2 = document.getElementById('laptopRadio');
      radiobtn2.checked = true;
      var radioSelector2 = document.querySelector('#laptopRadio')
      var nextSibling2 = radioSelector2.nextElementSibling;
      var selectSVG2 = nextSibling2.lastChild;
      selectSVG2.style.transform = 'scale(1)'
      // nextSibling2.classList.add('PrivateRadioButtonIcon-checked-16')
      document.getElementById("laptopRadio").tabIndex = 1;

      window.localStorage.removeItem('hotspot');
      document.getElementById('blackBtn').classList.add('select');
      document.getElementById('blackBtn').classList.add('active');

      // var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      //  alreadySelected.classList.remove('active');

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('blackBtn').classList.add('active');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.select');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('select');
      }
      window.RT_RecordEvent("Product Type","Laptop",window.config.name);
      //add for tab issues
      document.getElementById("hotspot1").setAttribute("tabindex","-1");
      // document.getElementById("tentBtn").setAttribute("tabindex", "-1");
      // document.getElementById("theaterBtn").setAttribute("tabindex", "-1");
      // document.getElementById("tabletBtn").setAttribute("tabindex", "-1");

      document.getElementById("hotspot2").setAttribute("tabindex","-1");
      document.getElementById("hotspot3").setAttribute("tabindex","-1");
      document.getElementById("hotspot4").setAttribute("tabindex","-1");
      document.getElementById("hotspot5").setAttribute("tabindex","-1");
      document.getElementById("hotspot6").setAttribute("tabindex","-1");
      document.getElementById("hotspot7").setAttribute("tabindex","-1");
      document.getElementById("hotspot8").setAttribute("tabindex","-1");
      document.getElementById("hotspot9").setAttribute("tabindex","-1");
      document.getElementById("hotspot10").setAttribute("tabindex","-1");

      document.getElementById("hotspot11").setAttribute("tabindex","-1");
      document.getElementById("hotspot12").setAttribute("tabindex","-1");
      document.getElementById("hotspot13").setAttribute("tabindex","-1");

      // document.getElementById("tentBtn").setAttribute("tabindex","-1");
      // document.getElementById("theaterBtn").setAttribute("tabindex","-1");
      // document.getElementById("tabletBtn").setAttribute("tabindex","-1");

      //  document.getElementById('laptop2in1').classList.remove('select');
      document.getElementById('laptop').classList.add('active');
      document.getElementById('laptop2in1').classList.remove('active');
      document.getElementById('laptop2in1').classList.remove('select');

      GotoPosInTimeNamedValue(window.config.default,function () {

         window.scene.groupApplyState("Silver_180");
         window.scene.groupApplyState("screenfill_180");
      });

      // document.querySelector('#blackBtn').classList.add('Btnsubmenus');
      // document.querySelector('#blackBtn').classList.remove('Mui-disabled');
      // document.querySelector('#blackBtn').style.pointerEvents = 'auto';
      document.querySelector('#blackBtn').style.pointerEvents = "auto";
      // document.querySelector('#blackBtn').setAttribute = ("onclick");
      // document.querySelector('#menucolor').setAttribute = ("onBlackBtnClick");


      // document.querySelector('#tentBtn').classList.add('Mui-disabled');
      // document.querySelector('#tentBtn').style.pointerEvents = 'none';
      // document.querySelector('#tentBtn').setAttribute("tabindex", "-1");

      // document.querySelector('#theaterBtn').classList.add('Mui-disabled');
      // document.querySelector('#theaterBtn').style.pointerEvents = 'none';
      // document.querySelector('#theaterBtn').setAttribute("tabindex", "-1");

      // document.querySelector('#tabletBtn').classList.add('Mui-disabled');
      // document.querySelector('#tabletBtn').style.pointerEvents = 'none';
      // document.querySelector('#tabletBtn').setAttribute("tabindex", "-1");
      document.getElementById("blackBtn").setAttribute("tabindex","1");

      // document.getElementById("tentBtn1").setAttribute("tabindex", "-1");
      // document.getElementById("theaterBtn1").setAttribute("tabindex", "-1");
      // document.getElementById("tabletBtn1").setAttribute("tabindex", "-1");

      if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
         var currentPosName = position.currentPos;
         if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
         // window.scene.animPlayAllChildrenInTime("Tab",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         // window.scene.animPlayAllChildrenInTime("Tab.001",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.clearRefine();
         position.currentPos = 'reset';
         window.scene.clearRefine();
      } else {
         var currentPosName = position.currentPos;
         if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
         // window.scene.animPlayAllChildrenInTime("Tab",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         // window.scene.animPlayAllChildrenInTime("Tab.001",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.clearRefine();
         position.currentPos = 'reset';
         window.scene.clearRefine();
      }


   }

   const [value,setValue] = useState('2 in 1');

   const select2in1Click = (event) => {
      setlaptop360(true);
      setlaptop180(false);
      console.log(laptop360);
      selectedButton = 'onResetMode';
      setValue(event.target.value);
      setDisplayed(false);
      setHidden(true);
      // setExpandedPanel(false);
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('laptop2in1').setAttribute('aria-label','2in1 radio butoon selected');
      var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
      if (alreadySelecte != null) {
         alreadySelecte.classList.remove('select');
      }

      // var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      // if(alreadySelected != null){
      //   alreadySelected.classList.remove('active');
      // }
      document.getElementById('laptop2in1').classList.add('active');
      document.getElementById('laptop2in1').classList.add('select');

      document.getElementById('blackBtn').classList.add('select');
      document.getElementById('blackBtn').classList.add('active');

      document.getElementById('laptop').classList.remove('active');
      document.getElementById('laptop').classList.remove('select');
      // document.getElementById("tentBtn").setAttribute("tabindex","1");
      // document.getElementById("theaterBtn").setAttribute("tabindex","1");
      // document.getElementById("tabletBtn").setAttribute("tabindex","1");

      // document.getElementById("blackBtn").setAttribute("tabindex", "-1");

      window.localStorage.removeItem('hotspot');
      window.scene.groupApplyState("screen_180");
      window.scene.groupApplyState("GP_open");
      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screenfill_360");
      window.scene.groupApplyState("dynamic_reset");

      window.localStorage.setItem("laptop","laptop360");
      window.localStorage.removeItem('hotspot');

      var radiobtn1 = document.getElementById('laptopRadio');
      radiobtn1.checked = false;
      var radioSelector1 = document.querySelector('#laptopRadio')
      var nextSibling1 = radioSelector1.nextElementSibling;
      var selectSVG1 = nextSibling1.lastChild;
      selectSVG1.style.transform = 'scale(0)'
      var radiobtn2 = document.getElementById('twoinoneRadio');
      radiobtn2.checked = true;
      var radioSelector2 = document.querySelector('#twoinoneRadio')
      var nextSibling2 = radioSelector2.nextElementSibling;
      var selectSVG2 = nextSibling2.lastChild;
      selectSVG2.style.transform = 'scale(1)'

      window.localStorage.removeItem('color');
      document.getElementById("twoinoneRadio").tabIndex = 1;


      window.RT_RecordEvent("Product Type","2 in 1",window.config.name);
      //add for tab issues
      document.getElementById("hotspot1").setAttribute("tabindex","-1");
      document.getElementById("hotspot2").setAttribute("tabindex","-1");
      document.getElementById("hotspot3").setAttribute("tabindex","-1");
      document.getElementById("hotspot4").setAttribute("tabindex","-1");
      document.getElementById("hotspot5").setAttribute("tabindex","-1");
      document.getElementById("hotspot6").setAttribute("tabindex","-1");
      document.getElementById("hotspot7").setAttribute("tabindex","-1");
      document.getElementById("hotspot8").setAttribute("tabindex","-1");
      document.getElementById("hotspot9").setAttribute("tabindex","-1");
      document.getElementById("hotspot10").setAttribute("tabindex","-1");

      document.getElementById("hotspot11").setAttribute("tabindex","-1");
      document.getElementById("hotspot12").setAttribute("tabindex","-1");
      document.getElementById("hotspot13").setAttribute("tabindex","-1");


      setLaptop360FrontImg("./img/front360_black.png");
      setLaptop360TopImg("./img/top360.png");
      setLaptop360LefttImg("./img/360_left.png");
      setLaptop360RightImg("./img/360_right.png");
      setLaptop360BackImg("./img/360_back.png");
      setLaptop360BottomImg("./img/360_Bottom.png");
      resetBacklitCloseImg();

      GotoPosInTimeNamedValue(window.config.default,function () {
         window.scene.groupApplyState("Silver");

      });
      // document.querySelector('#blackBtn').classList.add('Mui-disabled');
      document.querySelector('#blackBtn').style.pointerEvents = "auto";
      // document.querySelector('#blackBtns').classList.remove('Btnsubmenus');

      // document.querySelector('#blackBtn').removeAttribute = ("onclick");

      // document.querySelector('#menucolor').removeAttribute = ("onBlackBtnClick");


      // document.querySelector('#tentBtn').classList.remove('Mui-disabled');
      // document.querySelector('#tentBtn').style.pointerEvents = 'auto';
      // document.querySelector('#tentBtn').setAttribute("tabindex", "1");

      // document.querySelector('#theaterBtn').classList.remove('Mui-disabled');
      // document.querySelector('#theaterBtn').style.pointerEvents = 'auto';
      // document.querySelector('#theaterBtn').setAttribute("tabindex", "1");

      // document.querySelector('#tabletBtn').classList.remove('Mui-disabled');
      // document.querySelector('#tabletBtn').style.pointerEvents = 'auto';
      // document.querySelector('#tabletBtn').setAttribute("tabindex", "1");
      document.getElementById("blackBtn").setAttribute("tabindex","1");

      // document.getElementById("tentBtn1").setAttribute("tabindex", "1");
      // document.getElementById("theaterBtn1").setAttribute("tabindex", "1");
      // document.getElementById("tabletBtn1").setAttribute("tabindex", "1");

      if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
         var currentPosName = position.currentPos;
         if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
         // window.scene.animPlayAllChildrenInTime("Tab",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         // window.scene.animPlayAllChildrenInTime("Tab.001",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         window.scene.clearRefine();
         position.currentPos = 'reset';
         window.scene.clearRefine();
      } else {
         var currentPosName = position.currentPos;
         if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
         // window.scene.animPlayAllChildrenInTime("Tab",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         // window.scene.animPlayAllChildrenInTime("Tab.001",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.clearRefine();
         position.currentPos = 'reset';
         window.scene.clearRefine();
      }

   }

   //MenuProductView

   const onFrontClick = (isNextPrevious) => {
      console.log(position.nintyDegree,position.currentPos)
      console.log('onFrontClick')
      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('frontBtn').classList.add('active');
      window.localStorage.setItem("position","reset");

      var currentPosName = position.currentPos;

      selectedButton = 'onFrontClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Front view');

         document.getElementById('nextView').setAttribute('aria-label','Front view');
      }

      // if (laptop180) {
      //    window.scene.groupApplyState("screenfill_180");
      // } else {
      //    window.scene.groupApplyState("screenfill_360");
      // }

      window.localStorage.removeItem('hotspot');

      reversAll();
      resetBacklitCloseImg();

      GotoPosInTimeNamedValue(window.config.front,function () {


         window.localStorage.setItem('hotspot','front')

         if (isNextPrevious != true) {
            window.document.getElementById("hotspot1demo").focus();
         }
      })
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","-1");
         document.getElementById("hotspot6").setAttribute("tabindex","-1");
         document.getElementById("hotspot7").setAttribute("tabindex","-1");
         document.getElementById("hotspot8").setAttribute("tabindex","-1");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","1");
         document.getElementById("hotspot12").setAttribute("tabindex","1");
         document.getElementById("hotspot13").setAttribute("tabindex","1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");

      }

   }
   const onBackClick = (isNextPrevious) => {
      //Update ZoomBar
      var slider = document.getElementById("sliderRange");


      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      console.log(position.nintyDegree,position.currentPos)
      console.log('onBackClick')
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('backBtn').classList.add('active');
      window.localStorage.setItem("position","reset");

      var currentPosName = position.currentPos;

      selectedButton = 'onBackClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Front view');

         document.getElementById('nextView').setAttribute('aria-label','Front view');
      }
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }

      if (window.storeData.currentState == "sky") {

         window.scene.groupApplyState("Millenio_5G_OFF");
         window.scene.groupApplyState("Millenio_WIFI_ON");

      }
      else if (window.storeData.currentState == "slate") {

         window.scene.groupApplyState("Millenio_WIFI_OFF");
         window.scene.groupApplyState("Millenio_5G_ON");


      }

      window.localStorage.removeItem('hotspot');

      reversAll();
      resetBacklitCloseImg();
      GotoPosInTimeNamedValue(window.config.back,function () {

         window.localStorage.setItem('hotspot','back')

         if (isNextPrevious != true) {
            window.document.getElementById("hotspot1demo").focus();
         }
      })
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","-1");
         document.getElementById("hotspot6").setAttribute("tabindex","-1");
         document.getElementById("hotspot7").setAttribute("tabindex","-1");
         document.getElementById("hotspot8").setAttribute("tabindex","-1");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","1");
         document.getElementById("hotspot12").setAttribute("tabindex","1");
         document.getElementById("hotspot13").setAttribute("tabindex","1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");

      }
      window.RT_RecordEvent("Product Type","Back",window.config.name);
      window.scene.clearRefine();

   }
   const onRightClick = (isNextPrevious) => {
      //Update ZoomBar
      console.log(position.nintyDegree,position.currentPos)
      console.log('onRightClick')
      selectedButton = 'onRightClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','right view');

         document.getElementById('nextView').setAttribute('aria-label','right view');
      }
      window.localStorage.removeItem('hotspot');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('rightBtn').classList.add('active');

      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screen_180");
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      window.localStorage.removeItem('hotspot');
      var slider = document.getElementById("sliderRange");

      reversAll();
      resetBacklitCloseImg();

      GotoPosInTimeNamedValue(window.config.right,function () {


         if (slider != null) {
            document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
            setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
         }
         window.localStorage.setItem('hotspot','right')
         if (isNextPrevious != true) {
            window.document.getElementById("hotspot1demo").focus();
         }

      });

      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","1");
         document.getElementById("hotspot6").setAttribute("tabindex","1");
         document.getElementById("hotspot7").setAttribute("tabindex","1");
         document.getElementById("hotspot8").setAttribute("tabindex","1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
      }
      window.RT_RecordEvent("Product Type","Right",window.config.name);
      window.scene.clearRefine();
   }

   const onLeftClick = (isNextPrevious) => {
      //Update ZoomBar

      // console.log(position.nintyDegree,position.currentPos)
      console.log('onLeftClick')
      var slider = document.getElementById("sliderRange");
      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      // console.log("left")
      selectedButton = 'onLeftClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','left view');

         document.getElementById('nextView').setAttribute('aria-label','left view');
      }
      window.localStorage.removeItem('hotspot');

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('leftBtn').classList.add('active');
      window.localStorage.setItem("position","reset");
      (window.localStorage.getItem("hotspot","right"))
      window.scene.groupApplyState("screen_180");
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      reversAll();
      GotoPosInTimeNamedValue(window.config.left,function () {


         window.localStorage.setItem('hotspot','left')
         if (isNextPrevious != true) {
            window.document.getElementById("hotspot1demo").focus();
         }

      });
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","1");
         document.getElementById("hotspot2").setAttribute("tabindex","1");
         document.getElementById("hotspot3").setAttribute("tabindex","1");
         document.getElementById("hotspot4").setAttribute("tabindex","1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");
         document.getElementById("hotspot5").setAttribute("tabindex","-1");
         document.getElementById("hotspot6").setAttribute("tabindex","-1");
         document.getElementById("hotspot7").setAttribute("tabindex","-1");
         document.getElementById("hotspot8").setAttribute("tabindex","-1");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
      }
      window.RT_RecordEvent("Product Type","Left",window.config.name);
      window.scene.clearRefine();
   }

   const onBottomClick = (isNextPrevious) => {
      //Update ZoomBar
      console.log(position.nintyDegree,position.currentPos)
      console.log('onBottomClick')
      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      selectedButton = 'onBottomClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','bottom view');

         document.getElementById('nextView').setAttribute('aria-label','bottom view');
      }
      window.localStorage.removeItem('hotspot');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('bottomBtn').classList.add('active');

      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screen_180");
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      window.localStorage.removeItem('hotspot');
      var slider = document.getElementById("sliderRange");
      reversAll();
      resetBacklitCloseImg();
      window.scene.groupApplyState("Tab_Reflection_OFF");
      GotoPosInTimeNamedValue(window.config.bottom,function () {

         window.localStorage.setItem('hotspot','right')
         if (isNextPrevious != true) {
            window.document.getElementById("hotspot1demo").focus();
         }
         window.scene._nav.SetRotationCenter([-0.0108,7.868,0]);
      });

      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","1");
         document.getElementById("hotspot6").setAttribute("tabindex","1");
         document.getElementById("hotspot7").setAttribute("tabindex","1");
         document.getElementById("hotspot8").setAttribute("tabindex","1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
      }
      window.RT_RecordEvent("Product Type","Bottom",window.config.name);
      window.scene.clearRefine();
   }

   const onTopClick = (isNextPrevious) => {
      //Update ZoomBar
      console.log(position.top,position.currentPos);
      console.log('onTopClick')
      var slider = document.getElementById("sliderRange");
      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      selectedButton = 'onTopClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Top view');

         document.getElementById('nextView').setAttribute('aria-label','Top view');
      }
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }

      window.localStorage.removeItem('hotspot');

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('topBtn').classList.add('active');
      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screen_180");
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }

      window.scene.groupApplyState("GP_open");
      window.scene.groupApplyState("dynamic_reset");
      reversAll();
      resetBacklitCloseImg();
      window.scene.groupApplyState("Tab_Reflection_OFF");
      window.scene.groupApplyState("Backlit_OFF");
      GotoPosInTimeNamedValue(window.config.top,function () {

         window.localStorage.setItem('hotspot','top')
         if (isNextPrevious != true) {
            window.document.getElementById("hotspot1demo").focus();
         }
         window.scene._nav.SetRotationCenter([-0.0108,7.868,0]);
      });
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","-1");
         document.getElementById("hotspot6").setAttribute("tabindex","-1");
         document.getElementById("hotspot7").setAttribute("tabindex","-1");
         document.getElementById("hotspot8").setAttribute("tabindex","-1");
         document.getElementById("hotspot9").setAttribute("tabindex","1");
         document.getElementById("hotspot10").setAttribute("tabindex","1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
      }
      window.RT_RecordEvent("Product Type","Top",window.config.name);
      window.scene.clearRefine();
   }

   //MenuFeatureView

   const [openCloseOnOff,setOpenCloseOnOff] = useState(false);
   const [backlit,setBacklite] = useState("./img/stylus_W.png");
   const [opneClose,setOpenClose] = useState("./img/Folio_W.png");
   const [backliteOnOff,setBackliteOnOff] = useState(false);

   const xpsFolioClick = () => {
      reversAnimAll();

      window.scene.groupApplyState("Pen_OFF");
      window.scene.groupApplyState("Keyboard_OFF");
      // window.scene.groupApplyState("Tab_Reflection_ON");
      window.scene.groupApplyState("Tab_Reflection_OFF");

      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      selectedButton = 'xpsFolioClick';
      window.scene.groupApplyState("Keyboard_ON");
      window.scene.groupApplyState("Tab_Reflection_OFF");
      window.localStorage.removeItem('hotspot');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('xpsFolioClick').classList.add('active');

      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screen_180");
      window.scene.groupApplyState("dynamic_reset");

      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      window.scene.groupApplyState("GP_open");
      window.scene.groupApplyState("dynamic_reset");

      resetBacklitCloseImg();



      //add for tab issues
      document.getElementById("hotspot1").setAttribute("tabindex","-1");
      document.getElementById("hotspot2").setAttribute("tabindex","-1");
      document.getElementById("hotspot3").setAttribute("tabindex","-1");
      document.getElementById("hotspot4").setAttribute("tabindex","-1");
      document.getElementById("hotspot5").setAttribute("tabindex","-1");
      document.getElementById("hotspot6").setAttribute("tabindex","-1");
      document.getElementById("hotspot7").setAttribute("tabindex","-1");
      document.getElementById("hotspot8").setAttribute("tabindex","-1");
      document.getElementById("hotspot9").setAttribute("tabindex","-1");
      document.getElementById("hotspot10").setAttribute("tabindex","-1");

      document.getElementById("hotspot11").setAttribute("tabindex","-1");
      document.getElementById("hotspot12").setAttribute("tabindex","-1");
      document.getElementById("hotspot13").setAttribute("tabindex","-1");

      window.localStorage.setItem("features","folio");

      if (openCloseOnOff) {

         console.log("off");
         setOpenCloseOnOff(false);

         document.getElementById('xpsFolioClick').setAttribute('aria-label','');
         document.getElementById('openCloseLid').innerHTML = 'Backlit off';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Backlit off');
            document.getElementById('nextView').setAttribute('aria-label','Backlit off');
         }
         GotoPosInTimeNamedValue(window.config.folio,function () { })

         window.scene.groupApplyState("Pen_OFF");

         window.RT_RecordEvent("Features","Backlite Off",window.config.name);


      } else {
         // backliteVar.setAttribute.ariaLabel = "Backlit on";
         document.getElementById('backlitBtn').setAttribute('aria-label','');
         document.getElementById('openCloseLid').innerHTML = 'Backlit on';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Backlit on');
            document.getElementById('nextView').setAttribute('aria-label','Backlit on');
         }
         setOpenCloseOnOff(true);
         console.log("on");
         //setOpenClose("./img/stylus_W.png");
         GotoPosInTimeNamedValue(window.config.folio,function () {
         });
         window.scene.groupApplyState("Pen_OFF");
         window.RT_RecordEvent("Features","Backlite On",window.config.name);

      }

      window.scene.animPlayAllChildrenInTime("Stylus",4.166,3000);

      window.scene.animPlayAllChildrenInTime("Tablet",4.1659,3000);
      window.scene.animPlayAllChildrenInTime("joint3",4.1659,3000);
      window.scene.animPlayAllChildrenInTime("joint4",4.1659,3000);
      window.scene.animPlayAllChildrenInTime("SPINE",4.1659,3000);

      if (window.storeData.currentState == "sky") {

         window.scene.groupApplyState("Folio_Sky");
         setTimeout(function () {
            window.scene.groupApplyState("Folio_Sky_shadow");
         },3100);
         setOpenClose("./img/Folio_W.png");
         console.log("sky se folio ");
      }
      else if (window.storeData.currentState == "slate") {
         window.scene.groupApplyState("Folio_Slate");
         setTimeout(function () {
            window.scene.groupApplyState("Folio_Slate_shadow");
         },3100);
               
         setOpenClose("./img/Folio_B.png");
         console.log("slate se folio ");

      }

      // window.scene.animPlayAllChildrenInTime("Main_Group",4.1659,3000,function () {


      // });


      // window.scene.animPlayAllChildrenInTime("joint3",4.1659,3000);
      //    window.scene.animPlayAllChildrenInTime("joint4",4.1659,3000);
      //    window.scene.animPlayAllChildrenInTime("SPINE",4.1659,3000);
      //    window.scene.animPlayAllChildrenInTime("Tablet",4.1659,3000);

      window.scene.clearRefine();


   }

   let backliteVar = document.getElementById('backlitBtn');

   const xpsStylusClick = () => {
      // reversAll();
      reversAnimAll();
      //Update ZoomBar
      window.scene.groupApplyState("Pen_OFF");
      window.scene.groupApplyState("Keyboard_OFF");
      window.scene.groupApplyState("Tab_Reflection_ON");

      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      selectedButton = 'xpsStylusClick';
      window.scene.groupApplyState("Keyboard_ON");

      window.localStorage.removeItem('hotspot');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('backlitBtn').classList.add('active');

      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("screen_180");
      window.scene.groupApplyState("dynamic_reset");
      window.scene.groupApplyState("Tab_Reflection_OFF");

      window.localStorage.setItem("features","stylus");

      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      window.scene.groupApplyState("GP_open");
      window.scene.groupApplyState("dynamic_reset");

      resetBacklitCloseImg();

      if (window.storeData.currentState == "sky") {

         window.scene.groupApplyState("Stylus_Sky");
         setTimeout(function () {
            window.scene.groupApplyState("Stylus_Sky_Shadow");
         },3100);
         setOpenClose("./img/Folio_W.png");
         console.log("sky se styulus ");
      }
      else if (window.storeData.currentState == "slate") {

         window.scene.groupApplyState("Stylus_Slate");
         setTimeout(function () {
            window.scene.groupApplyState("Stylus_Slate_Shadow ");
         },3100);
         setOpenClose("./img/Folio_B.png");
         console.log("slate se stylus ");

      }


      GotoPosInTimeNamedValue(window.config.folio,function () {

         window.scene.clearRefine();
      })

      //add for tab issues
      document.getElementById("hotspot1").setAttribute("tabindex","-1");
      document.getElementById("hotspot2").setAttribute("tabindex","-1");
      document.getElementById("hotspot3").setAttribute("tabindex","-1");
      document.getElementById("hotspot4").setAttribute("tabindex","-1");
      document.getElementById("hotspot5").setAttribute("tabindex","-1");
      document.getElementById("hotspot6").setAttribute("tabindex","-1");
      document.getElementById("hotspot7").setAttribute("tabindex","-1");
      document.getElementById("hotspot8").setAttribute("tabindex","-1");
      document.getElementById("hotspot9").setAttribute("tabindex","-1");
      document.getElementById("hotspot10").setAttribute("tabindex","-1");

      document.getElementById("hotspot11").setAttribute("tabindex","-1");
      document.getElementById("hotspot12").setAttribute("tabindex","-1");
      document.getElementById("hotspot13").setAttribute("tabindex","-1");

      if (backliteOnOff) {

         console.log("off");
         setBackliteOnOff(false);

         document.getElementById('backlitBtn').setAttribute('aria-label','');
         document.getElementById('backlitOnnOff').innerHTML = 'Backlit off';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Backlit off');
            document.getElementById('nextView').setAttribute('aria-label','Backlit off');
         }
         GotoPosInTimeNamedValue(window.config.folio,function () { })

         window.scene.groupApplyState("Pen_ON");

         window.RT_RecordEvent("Features","Backlite Off",window.config.name);


      } else {
         // backliteVar.setAttribute.ariaLabel = "Backlit on";
         document.getElementById('backlitBtn').setAttribute('aria-label','');
         document.getElementById('backlitOnnOff').innerHTML = 'Backlit on';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Backlit on');
            document.getElementById('nextView').setAttribute('aria-label','Backlit on');
         }
         setBackliteOnOff(true);
         console.log("on");
         //setBacklite("./img/stylus_W.png");
         GotoPosInTimeNamedValue(window.config.folio,function () {
         });
         window.scene.groupApplyState("Pen_ON");
         window.RT_RecordEvent("Features","Backlite On",window.config.name);
         window.scene.clearRefine();


      }

      window.scene.animPlayAllChildrenInTime("Stylus",2.0829999,4000);
      window.scene.animPlayAllChildrenInTime("Tablet",2.083,0);
      window.scene.animPlayAllChildrenInTime("joint3",2.083,3000);
      window.scene.animPlayAllChildrenInTime("joint4",2.083,3000);
      window.scene.animPlayAllChildrenInTime("SPINE",2.083,3000,function () {


      });




      //    var currentPosName = position.currentPos;
      //    if (position.nintyDegree == position[currentPosName]) { position.currentPos = 'nintyDegree'; return; }
      //   if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
      //      console.log("Theater")
      //      window.scene.animPlayAllChildrenInTime("Main_Group",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      //      // window.scene.animPlayAllChildrenInTime("Tab.001",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      //   }
      //   else {
      //      console.log("else")
      //      window.scene.animPlayAllChildrenInTime("Main_Group",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      //      // window.scene.animPlayAllChildrenInTime("Tab.001",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      //   }

      window.scene.clearRefine();


   }

   //menucolor

   const color1Click = () => {

      window.scene.groupApplyState("Millenio_5G_OFF");


      window.storeData.currentState = "sky";
      //   var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
      // alreadySelecte.classList.remove('select');
      console.log("click1");
      var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
      if (alreadySelecte != null) {
         alreadySelecte.classList.remove('select');
      }
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('blackBtn').classList.add('select');
      document.getElementById('blackBtn').classList.add('active');
      document.getElementById('whiteBtn').classList.remove('active');

      window.localStorage.setItem("position","reset");

      setOpenCloseOnOff(false);
      setOpenClose("./img/Folio_W.png");
      setBackliteOnOff(false);
      setBacklite("./img/stylus_W.png");
      setLaptop360FrontImg("./img/front180White.png");
      setLaptop360TopImg("./img/top180White.png");
      setLaptop360LefttImg("./img/180_white_left.png");
      setLaptop360RightImg("./img/180_white_right.png");
      setLaptop360BackImg("./img/180_white_back.png");
      setLaptop360BottomImg("./img/180_white_Bottom.png");
      // window.scene.groupApplyState("screenfill_180");
      window.localStorage.setItem("color","laptopSilver");
      setPort4Click(false);
      // if (window.localStorage.getItem('laptop') == 'laptop360') {
      //    console.log('a')
      //    window.scene.groupApplyState("Silver");  

      // }
      // else if (window.localStorage.getItem('laptop') == 'laptop180') {
      //    console.log('b')
      //    window.scene.groupApplyState("Silver_180");
      //    window.scene.groupApplyState("screenfill_180");

      // }

      if (window.localStorage.getItem('features') == "folio") {
         window.scene.groupApplyState("Folio_Sky");
         setOpenClose("./img/Folio_W.png");
         console.log("sky se folio ");
      }
      else if (window.localStorage.getItem('features') == "stylus") {
         window.scene.groupApplyState("Stylus_Sky");
         setOpenClose("./img/Folio_B.png");
         console.log("sky se Stylus_Sky ");
      }
      else {
         window.scene.groupApplyState("Millenio_WIFI_ON");
      }

      if (selectedButton == 'xpsFolioClick' || selectedButton == 'xpsStylusClick') {
         window.scene.groupApplyState("Tab_Reflection_OFF");
      }
      else {
         console.log('reflection on');
         window.scene.groupApplyState("Tab_Reflection_ON");
      }



      window.localStorage.setItem("silver",true);
      window.RT_RecordEvent("Color","Aluminium",window.config.name);
      window.scene.clearRefine();



   }

   const color2Click = () => {
      window.scene.groupApplyState("Millenio_WIFI_OFF");

      window.storeData.currentState = "slate";
      console.log("click2");

      window.localStorage.setItem("position","reset");
      window.localStorage.setItem("color","laptopBlack");
      window.localStorage.removeItem('closeMode');




      setOpenCloseOnOff(false);
      setOpenClose("./img/Folio_B.png");
      setBackliteOnOff(false);
      setBacklite("./img/stylus_W.sec.png");
      setLaptop360FrontImg("./img/front360_black.png");
      setLaptop360TopImg("./img/top360.png");
      setLaptop360LefttImg("./img/360_left.png");
      setLaptop360RightImg("./img/360_right.png");

      setLaptop360BackImg("./img/360_back.png");
      setLaptop360BottomImg("./img/360_Bottom.png");
      // window.scene.groupApplyState("screenfill_180");
      setPort2Click(false);
      setPort1Click(false);
      setPort3Click(false);
      setPort4Click(false);


      window.localStorage.setItem("Carbon_Fibre",true);
      if (window.localStorage.getItem('laptop') == 'laptop360') {
         // console.log('a')
         //         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
         // alreadySelecte.classList.remove('select');

         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
         if (alreadySelecte != null) {
            alreadySelecte.classList.remove('select');
         }

         var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
         if (alreadySelected != null) {
            alreadySelected.classList.remove('active');
         }
         document.getElementById('blackBtn').classList.remove('select');
         document.getElementById('blackBtn').classList.remove('active');

         document.getElementById('whiteBtn').classList.add('select');
         document.getElementById('whiteBtn').classList.add('active');
         // window.scene.groupApplyState("Silver");  

      }
      else if (window.localStorage.getItem('laptop') == 'laptop180') {
         // console.log('b')
         //         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
         // alreadySelecte.classList.remove('select');

         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
         if (alreadySelecte != null) {
            alreadySelecte.classList.remove('select');
         }

         var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
         if (alreadySelected != null) {
            alreadySelected.classList.remove('active');
         }
         document.getElementById('blackBtn').classList.add('select');
         document.getElementById('blackBtn').classList.add('active');

         document.getElementById('whiteBtn').classList.remove('select');
         document.getElementById('whiteBtn').classList.remove('active');


         // window.scene.groupApplyState("Carbon_Black");
         // window.scene.groupApplyState("screenfill_180");

      }

      if (window.localStorage.getItem('features') == "folio") {
         window.scene.groupApplyState("Folio_Slate");
         setOpenClose("./img/Folio_W.png");
         console.log("slate se folio ");
      }
      else if (window.localStorage.getItem('features') == "stylus") {
         window.scene.groupApplyState("Stylus_Slate");
         setOpenClose("./img/Folio_B.png");
         console.log("slate se Stylus_Sky ");
      }
      else {

         window.scene.groupApplyState("Millenio_5G_ON");
      }

      if (selectedButton == 'xpsFolioClick' || selectedButton == 'xpsStylusClick') {
         window.scene.groupApplyState("Tab_Reflection_OFF");
      }
      else {
         window.scene.groupApplyState("Tab_Reflection_ON");
      }
      window.RT_RecordEvent("Color","Carbon Fiber",window.config.name);
      window.scene.clearRefine();
   }
   //Menu Position

   const [port1Click,setPort1Click] = useState(false);
   const [port2Click,setPort2Click] = useState(false);
   const [port3Click,setPort3Click] = useState(false);
   const [port4Click,setPort4Click] = useState(false);
   const [port5Click,setPort5Click] = useState(true);

   const [nextClick,setNextClick] = useState(false);
   const [prevClick,setPrevClick] = useState(false);


   const resetMode = () => {
      selectedButton = 'onResetMode';
      GotoPosInTimeNamedValue(window.config.default,function () { })
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Reset Mode');

         document.getElementById('nextView').setAttribute('aria-label','Reset Mode');
      }
   }
   const onResetMode = () => {
      //Update ZoomBar
      console.log(position.tent,position.currentPos)

      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      window.scene.groupApplyState("screen_180");
      window.localStorage.removeItem('color');
      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }

      if (selectedButton == 'onFrontClick') {
         console.log("front onreset")
         GotoPosInTimeNamedValue(window.config.front,function () {

         });
         onFrontClick();
      }
      else if (selectedButton == 'onBackClick') {
         console.log("front onreset")
         GotoPosInTimeNamedValue(window.config.back,function () {

         });
         onBackClick();
      }
      else if (selectedButton == 'onTopClick') {
         console.log("top onreset")

         GotoPosInTimeNamedValue(window.config.front,function () { });
         onTopClick();
      }
      else if (selectedButton == 'onRightClick') {
         onRightClick();
         GotoPosInTimeNamedValue(window.config.right,function () {
            window.localStorage.setItem('hotspot','right')

         })

      }
      else if (selectedButton == 'onLeftClick') {
         onLeftClick();
         GotoPosInTimeNamedValue(window.config.left,function () {
            window.localStorage.setItem('hotspot','left')

         })
      }
      else if (selectedButton == 'onBottomClick') {
         onBottomClick();
         GotoPosInTimeNamedValue(window.config.bottom,function () {

         })
      }

      else if (selectedButton == 'xpsStylusClick') {
         GotoPosInTimeNamedValue(window.config.folio,function () {
         })
         window.scene.clearRefine();

      }
      else if (selectedButton == 'xpsFolioClick') {
         GotoPosInTimeNamedValue(window.config.folio,function () {
         })
         window.scene.clearRefine();

      } else if (selectedButton == 'onResetMode') {
         resetMode()
         GotoPosInTimeNamedValue(window.config.default,function () { })
      }

      if (window.localStorage.getItem("Carbon_Fibre") == true) {
         window.scene.groupApplyState("Carbon_Fibre_180A");
         window.scene.groupApplyState("Screen_Fill_180_ON");
      } else if (window.localStorage.getItem("silver") == true) {
         window.scene.groupApplyState("Silver");
         window.scene.groupApplyState("Millenio_WIFI_ON");
         window.scene.groupApplyState("Millenio_5G_OFF");
         window.scene.groupApplyState("Screen_Fill_180_Silver_ON");
      }
      window.scene.clearRefine();
   }

   const onPreviousMode = () => {
      //Update ZoomBar
      var slider = document.getElementById("sliderRange");
      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      // alert(selectedButton)
      if (laptop180) {
         var prevButton;
         var selectedButtonIndex = buttonSeq180.findIndex(element => element === selectedButton)
         if (selectedButton == 'onFrontClick' || selectedButton == 'onResetMode') {
            prevButton = 'xpsFolioClick';
         } else {
            prevButton = buttonSeq180[selectedButtonIndex - 1];
         }
      }
      else {
         var prevButton;
         var selectedButtonIndex = buttonSeq.findIndex(element => element === selectedButton)
         if (selectedButton == 'onFrontClick' || selectedButton == 'onResetMode') {
            prevButton = 'xpsStylusClick';
         } else {
            prevButton = buttonSeq[selectedButtonIndex - 1];
         }
      }

      if (prevButton == 'onFrontClick') onFrontClick(true);
      else if (prevButton == 'onBackClick') onBackClick(true);
      else if (prevButton == 'onTopClick') onTopClick(true);
      else if (prevButton == 'onRightClick') onRightClick(true);
      else if (prevButton == 'onLeftClick') onLeftClick(true);
      else if (prevButton == 'onBottomClick') {
         onBottomClick(true);
         setExpandedPanel("panel1");

      }
      else if (prevButton == 'xpsFolioClick') xpsFolioClick(true);
      else if (prevButton == 'xpsStylusClick') {
         setExpandedPanel("panel3");

         xpsStylusClick(true);
      }
      return false;
   }

   const onNextMode = () => {
      //Update ZoomBar
      var slider = document.getElementById("sliderRange");
      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      if (laptop180) {
         var nextButton;
         var selectedButtonIndex = buttonSeq180.findIndex(element => element === selectedButton)
         if (selectedButton == 'xpsStylusClick') {
            nextButton = 'onFrontClick';
         } else {
            nextButton = buttonSeq180[selectedButtonIndex + 1];
         }
      }
      else {
         var nextButton;
         var selectedButtonIndex = buttonSeq.findIndex(element => element === selectedButton)
         if (selectedButton == 'xpsStylusClick') {
            nextButton = 'onFrontClick';
         } else {
            nextButton = buttonSeq[selectedButtonIndex + 1];
         }
      }
      if (nextButton == 'onFrontClick') {
         onFrontClick(true);
         setExpandedPanel("panel1");

      }
      else if (nextButton == 'onBackClick') onBackClick(true);
      else if (nextButton == 'onTopClick') onTopClick(true);
      else if (nextButton == 'onRightClick') onRightClick(true);
      else if (nextButton == 'onLeftClick') {

         onLeftClick(true);
      }
      else if (nextButton == 'onBottomClick') onBottomClick(true);
      else if (nextButton == 'xpsFolioClick') {
         xpsFolioClick(true);
         setExpandedPanel("panel3");
      }
      else if (nextButton == 'xpsStylusClick') xpsStylusClick(true);
      return false;
   }

   const [animValue,setAnimValue] = useState("On");

   const [animValue1,setAnimValue1] = useState("On");

   useEffect(() => {
      //console.log('useeffect working');
      window.localStorage.setItem('Animation','on');
      setAnimValue("On");
      document.getElementById("animSwitchValue").checked = true;
      document.getElementsByClassName('onOff')[0].style.left = "-17px";
      document.getElementById("animSwitchValue1").setAttribute('aria-label','Animation On')
      // document.getElementById('animSwitchValue1').setAttribute('aria-label','clickable checkbox checked On');

      setAnimValue1("On");
      document.getElementById("animSwitchValue1").checked = true;
      document.getElementsByClassName('onOff1')[0].style.left = "-17px";

   },[]);

   const setAnimationSwitch = (e) => {
      console.log(e)
      // displayName(e);
      const isChecked = document.getElementById("animSwitchValue").checked;

      if (isChecked == true) {
         //document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation Off');
         document.getElementById("animSwitchValue").checked = false;
         setAnimValue("Off");
         document.getElementsByClassName('onOff')[0].style.left = "9px";
         window.localStorage.setItem('Animation','off');
         window.RT_RecordEvent("Animations","Off",window.config.name);

         // alert("Animation On");

      } else {
         // document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation On')
         document.getElementById("animSwitchValue").checked = true;

         setAnimValue("On");
         window.localStorage.setItem('Animation','on');
         document.getElementsByClassName('onOff')[0].style.left = "-17px";
         // alert("Animation Off");
         window.RT_RecordEvent("Animations","On",window.config.name);
      }
   }
   const displayName = (e) => {
      console.log(e)
      const isChecked = document.getElementById("animSwitchValue").checked;

      if (isChecked == true) {
         setAnimValue("On");
         window.localStorage.setItem('Animation','on');
         document.getElementsByClassName('onOff')[0].style.left = "-17px";
         document.getElementById('animSwitchValue').setAttribute('aria-label','clickable checkbox checked On');
         // alert("Animation On");

      } else {
         setAnimValue("Off");
         document.getElementsByClassName('onOff')[0].style.left = "9px";
         window.localStorage.setItem('Animation','off');
         document.getElementById('animSwitchValue').setAttribute('aria-label','clickable checkbox checked Off');
         // alert("Animation Off");

      }

   }

   const setAnimationSwitch1 = (e) => {
      console.log(e)
      // displayName(e);
      const isChecked = document.getElementById("animSwitchValue1").checked;

      if (isChecked == true) {
         //document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation Off');
         document.getElementById("animSwitchValue1").checked = false;
         setAnimValue1("Off");
         // keyboardOff();
         document.getElementsByClassName('onOff1')[0].style.left = "9px";
         // window.localStorage.setItem('Animation1','off');
         window.animationSwitchVal = 'off';
         window.animationSwitchGlobal = 'off';


      } else {
         // document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation On')
         document.getElementById("animSwitchValue1").checked = true;

         setAnimValue1("On");
         window.animationSwitchVal = 'on';
         // keyboardOn();
         // window.localStorage.setItem('Animation1','on');
         window.animationSwitchGlobal = 'on';
         document.getElementsByClassName('onOff1')[0].style.left = "-17px";

      }


   }
   var animStopped = true;
   const displayName1 = (e) => {
      if (animStopped == false) {
         return;
         animStopped = false;
      }
      console.log(e)
      const isChecked = document.getElementById("animSwitchValue1").checked;

      if (isChecked == true) {
         setAnimValue1("On");
         // keyboardOn();
         // window.localStorage.setItem('Animation1','on');
         window.animation1SwitchGlobal = 'on';
         document.getElementsByClassName('onOff1')[0].style.left = "-17px";
         document.getElementById('animSwitchValue1').setAttribute('aria-label','clickable checkbox checked On');
         window.animationSwitchVal = 'on';

         if (mob) {
            document.getElementById('footerControls').removeAttribute('style');
            document.getElementById('footerControMob').style.display = 'block';
         }
         else if (isipad) {
            console.log('portrait');
            document.getElementById('footerControMob').style.display = 'block';
            document.getElementById('footerControls').style.display = 'block';
         }
         else {
            console.log("show");

            document.getElementById('footerControls').style.transition = "bottom 0.2s linear";
            document.getElementById('footerControls').style.bottom = "20px";
            /*  document.getElementById('footerControMob').style.transition = "bottom 0.2s linear";
             document.getElementById('footerControMob').style.bottom = "20px"; */

            document.getElementById('footerControls').style.visibility = "";
            document.getElementById('footerControIpad').style.visibility = "";
            //document.getElementById('footerControMob').style.visibility = "";

         }


      } else {
         setAnimValue1("Off");
         // keyboardOff();
         document.getElementsByClassName('onOff1')[0].style.left = "9px";
         // window.localStorage.setItem('Animation1','off');
         window.animation1SwitchGlobal = 'off';

         document.getElementById('animSwitchValue1').setAttribute('aria-label','clickable checkbox checked Off');

         if (mob) {
            document.getElementById('footerControls').removeAttribute('style');
            document.getElementById('footerControMob').style.display = 'none';
         } else if (isipad) {
            console.log('landscape');
            document.getElementById('footerControMob').style.display = 'none';
            document.getElementById('footerControls').style.display = 'none';
         }
         else {
            console.log("hide");
            //document.getElementById('footerControls').style.transition = "bottom 0.2s linear";
            document.getElementById('footerControls').style.bottom = "-112px";
            /*  document.getElementById('footerControMob').style.transition = "bottom 0.24s linear";
             document.getElementById('footerControMob').style.bottom = "-49px"; */
            setTimeout(function () {

               document.getElementById('footerControls').style.visibility = "hidden";
               document.getElementById('footerControIpad').style.visibility = "hidden";

               //document.getElementById('footerControMob').style.visibility = "hidden";

               animStopped = true;
            },200);
         }

      }

   }

   return (
      <>
         {/* <Hidden only={["xs",'sm']}> */}
         {!mob && <HowToUse />}
         {/* </Hidden> */}
         <Hidden only={['sm','md','lg','xl']}>

            <Button style={{ position: 'fixed',backgroundColor: '#F0F0F0',width: '100%',height: '56px',paddingTop: '15px',paddingBottom: '15px',zIndex: '1',border: '1px solid #E1E1E1',borderLeft: "none",borderRight: "none",borderRadius: "0",margin: "-1px 0px 0px 0px" }}
               variant="outlined"
               color="primary"
               // className={classes.button}
               endIcon={<img src="./img/cross.svg" alt="cross" style={{ marginLeft: '207px',height: '23px' }} />}
               onClick={props.toggleDrawerAction}
            >
               Main Menu
            </Button>
            <Howtousenew />

         </Hidden >
         <Hidden only={['md','lg','xl','xs']}>
            {moblandscap && <Howtousenew />}
         </Hidden>

         <Hidden only={["xs"]}>
            <FooterControl name="reset and next previous" onReset={onResetMode} onPrevious={onPreviousMode} onNext={onNextMode} />
         </Hidden>
         <Hidden only={['lg','xl']}>
            <FooterControlMob onResetMob={onResetMode} onPreviousMob={onPreviousMode} onNextMob={onNextMode} onResetIpad={onResetMode} onNextIpad={onNextMode} onPreviousIpad={onPreviousMode} />
         </Hidden>
         <MenuSelectProductType tabIndex="1" name={window.finalLangues.selectproduct_text} onclicked={laptopClick} onclickedtwo={select2in1Click} value={value} expanded={expandedPanel === 'panel5'} onChanged={handleAccordionChange('panel5')} />
         {/* <userContext.Provider value=""> */}

         <MenuColors name={window.finalLangues.colors} tabIndex="1" onWhiteBtnClick={color1Click} onBlackBtnClick={color2Click} expanded={expandedPanel === 'panel4'} onChanged={handleAccordionChange('panel4')} />

         {/* </userContext.Provider> */}
         {/* <MenuPositions name={window.finalLangues.position} tabIndex="1" onTentMode={TentModeClick} onTheaterMode={TheaterModeClick} onTabletMode={TabletModeClick} expanded={expandedPanel === 'panel2'} onChanged={handleAccordionChange('panel2')} /> */}

         <MenuProductView tabIndex="1" onFrontBtnClick={onFrontClick} onBackBtnClick={onBackClick} onTopBtnClick={onTopClick} onLeftBtnClick={onLeftClick} onRightBtnClick={onRightClick} onBottomBtnClick={onBottomClick} imgfront={laptop360FrontImg} imgtop={laptop360TopImg} imgleft={laptop360LeftImg} imgright={laptop360RightImg} imgback={laptop360BackImg} imgbottom={laptop360BottomImg} name={window.finalLangues.productview} expanded={expandedPanel === 'panel1'} onChanged={handleAccordionChange('panel1')} />

         <MenuFeatures name={window.finalLangues.feature} tabIndex="1" tobechange={opneClose} tobeChanged={backlit} openClosedClicked={xpsFolioClick} onOffBackliteClicked={xpsStylusClick} expanded={expandedPanel === 'panel3'} onChanged={handleAccordionChange('panel3')} />
         {/* <MenuKeyboard name="Keyboard" tabIndex="1" tobechange={opneClose} tobeChanged={backlit} angleOneClicked={onangleOneClick} angleTwoClicked={onangleTwoClick} angleThreeClicked={onangleThreeClick} expanded={expandedPanel === 'panel6'} onChanged={handleAccordionChange('panel6')} /> */}

         <AnimationBtn onchange={displayName} forKeypress={setAnimationSwitch} value={animValue} onchange1={displayName1} forKeypress1={setAnimationSwitch1} value1={animValue1} />

      </>
   );
}

export default MainMenu;