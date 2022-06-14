infinityrt_skin = function (uijson, enableui, fnComplete, opt) {
    var jsonhttp = new XMLHttpRequest();
    jsonhttp.skin = this;
    jsonhttp.enableui = (enableui != undefined) ? enableui : true;
    jsonhttp.open("GET", uijson, true);
    jsonhttp.onload = function (e) {
        if (jsonhttp.status >= 200 && jsonhttp.status <= 299) {
            var s = jsonhttp.skin;
            if (scene)
                scene.skin = s;
            else
                console.warn("***Warning: States not associated with a scene");
            s.ui = JSON.parse(jsonhttp.response);
            if (jsonhttp.enableui)
                s.createUI(opt);
            if (fnComplete)
                fnComplete();
        }
    };
    jsonhttp.send("");
};

infinityrt_skin.prototype.createDD = function (typename, vertical) {
    var div = document.createElement("div");
    div.className = "divRTSkinDD container btn-group-vertical";
	div.style="bottom:auto;top:40px";
    this.DDs.push(div);
    this.divUI.appendChild(div);

	if (vertical){
		div.style="bottom:auto;top:40px;overflow-y: auto; height: 80vh; width: 50mm;";
		var divVertical = document.createElement("div");
		divVertical.className = "col-sm-1";
		divVertical.style="padding-left: 5px; padding-right: 5px;";
		div.appendChild(divVertical);
		divVertical.parentDiv = div;
	}
    btn = div.btn = document.createElement("button");
    btn.innerHTML = typename;
    btn.id = "btnDD" + typename;
	btn.className = "btnDD btn btn-outline-primary";
    btn.parentDiv = div;
    btn.skin = this;
	btn.vertical = vertical;
    btn.addEventListener("click", function () {
        var ts = this.parentDiv.style;
        var ts_status = (ts.display === "");
        ts.display = ts_status ? "block" : "";
		
        for (var i = 0; i < this.skin.DDs.length; i++) {
            var div = this.skin.DDs[i];
            if (div == this.parentDiv){
				if (this.vertical){
					var maximumWidth = 0;
					for (var j = 0; j < div.childNodes[0].children.length; j++) {
						maximumWidth = (div.childNodes[0].children[j].offsetWidth > maximumWidth) ? div.childNodes[0].children[j].offsetWidth : maximumWidth;
					}
					maximumWidth += 40;
					ts.width = maximumWidth.toString()+"px";
				}
                continue;
			}
            div.style.display = "";
            div.btn.style.display = ts_status ? "none" : "";
        }
		//setTimeout(() => {
          //console.log(this.getBoundingClientRect()) // good
          //console.log(this.offsetWidth) // good
          //console.log(this.offsetHeight) // good
		  //console.log("NEW width:", document.getElementById("btn_Render_Cam_F14_Touchpad_Closeup").offsetWidth);
        //}, 1)
    });
    this.divUI.appendChild(btn);

	if (vertical){
		return divVertical; 
	}
	return div;
};

infinityrt_skin.prototype.createSkinButton = function (btnID, className, btnData, div) {
    var btn = document.createElement("button");
    btn.id = "btn_" + btnID;
    btn.innerHTML = btnID;
    btn.className = className;
	btn.className += " btn btn-outline-secondary btn-sm";
    btn.dataID = btnID;
    btn.data = btnData;
    btn.parentDiv = div;
    btn.skin = this;
    div.appendChild(btn);
    return btn;
};

infinityrt_skin.prototype.createSkinSlider = function (sldID, element, sldMin, sldMax, sldStep, div) {
	var label = document.createElement("span");
	label.id = "label" + element;
	label.innerHTML = sldID + ": ";
	
	var slider = document.createElement("input");
	slider.type = "range";
	slider.min = sldMin;
	slider.max = sldMax;
	slider.step= sldStep;
	slider.value = scene._nav[element];
	//slider.className = "slider";
	slider.id = "sld" + element;
	slider.style.width = "100%";
	slider.oninput = function() {
	  text.innerHTML = " " + this.value;
	  scene._nav[element] = parseFloat(this.value);
	}
	
	var text = document.createElement("span");
	text.id = element;
	text.innerHTML = " " + slider.value;
	
	var divlabel = document.createElement("div");
	divlabel.className="col-sm-2";
	divlabel.style["padding-left"]="5px";
	divlabel.style["padding-right"]="5px";
	
	var divslider = document.createElement("div");
	divslider.className="col-sm-3";
	divslider.style["padding-left"]="5px";
	divslider.style["padding-right"]="5px";
	
	var divtext = document.createElement("div");
	divtext.className="col-sm-1";
	divtext.style["padding-left"]="5px";
	divtext.style["padding-right"]="5px";
	
	
    var divslidercontainer = document.createElement("div");
	//divslidercontainer.class = "slidercontainer";
	divslidercontainer.className="text-primary row justify-content-start";
	divslidercontainer.style["padding-top"]="5px";
	
	label.parentDiv = divlabel;
    divlabel.appendChild(label);
	slider.parentDiv = divslider;
    divslider.appendChild(slider);
	text.parentDiv = divtext;
    divtext.appendChild(text);
	
	divlabel.parentDiv = divslidercontainer;
    divslidercontainer.appendChild(divlabel);
	divslider.parentDiv = divslidercontainer;
    divslidercontainer.appendChild(divslider);
	divtext.parentDiv = divslidercontainer;
    divslidercontainer.appendChild(divtext);
	
	
    divslidercontainer.parentDiv = div;
    divslidercontainer.skin = this;
    div.appendChild(divslidercontainer);
    return divslidercontainer;
};

infinityrt_skin.prototype.downloadNavigationSettings = function (filename) {
    var element = document.createElement('a');

	var navdiv = document.getElementById("divNavigation");
	if (!navdiv)
		return;
	var nav = {};
	for (var i=0; i < navdiv.childNodes.length; i++){
		if (navdiv.childNodes[i].children.length > 2){
			if (navdiv.childNodes[i].children[2].children.length){
				var obj = navdiv.childNodes[i].children[2].children[0];
				var name = obj.id;
				nav[name] = parseFloat(obj.textContent);
			}
		}
	}
	
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(nav)));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

infinityrt_skin.prototype.updateNavUI = function () {
	var navdiv = document.getElementById("divNavigation");
	if (!navdiv)
		return;

	for (var i=0; i < navdiv.childNodes.length; i++){
		if (navdiv.childNodes[i].children.length > 2){
			if (navdiv.childNodes[i].children[1].children.length){
				var navProperty = navdiv.childNodes[i].children[2].children[0].id;
				navdiv.childNodes[i].children[1].children[0].value = scene._nav[navProperty];
				navdiv.childNodes[i].children[1].children[0].oninput();
			}
		}
	}
}

infinityrt_skin.prototype.createUI = function (opt) {
    var div, btn;
    this.opt = opt;
    this.DDs = [];
    this.divUI = document.createElement("div");
    this.divUI.id = "divRTSkinMain";
    if (this.opt && this.opt.ref)
        this.divUI.id = this.opt.ref + ":" + this.divUI.id;
    this.divUI.className = "divRTSkinMain";
    if (opt && opt.top)
        this.divUI.style.top = opt.top;
    document.body.appendChild(this.divUI);

    if (this.ui.states.length > 0) {
        this.divStates = [];
        for (var i = 0; i < this.ui.states.length; i++) {
            var cat, displayname, name = this.ui.states[i];
            var nameelems = name.split(':');
            if (nameelems.length > 1) {
                cat = nameelems[0];
                displayname = nameelems[1];
            } else {
                cat = "States";
                displayname = name;
            }
            div = this.divStates[cat];
            if (div == undefined) {
                div = this.divStates[cat] = this.createDD(cat, true);
            }
            btn = this.createSkinButton(displayname, "btnRTState", name, div);
            btn.addEventListener("click", function () {
                var data = this.data;
                if (this.skin.opt && this.skin.opt.ref)
                    data = this.skin.opt.ref + ":" + data;
                scene.groupApplyState(data);
            });
        }
    }

    if (this.ui.positions) {
        div = this.createDD("GotoPos", true);
        for (var spname in this.ui.positions) {
            var sp = this.ui.positions[spname];
            btn = this.createSkinButton(spname, "btnRTGotoPos", sp, div);
            btn.addEventListener("click", function () {
                scene.gotoUINamedPosInTime(this.dataID);
            });
        }
    }

    if (this.ui.anims) {
        div = this.createDD("Anims", true);
        for (var animname in this.ui.anims) {
            var anim = this.ui.anims[animname];
            anim.name = animname;
            anim.curr = false;
            btn = this.createSkinButton(animname, "btnRTAnim", anim, div);
            btn.addEventListener("click", function () {
                var an = this.data;
                an.curr = !an.curr;
                scene.animPlayAllChildrenInTime(an.name, an.curr ? an.end : an.start, an.time);
                scene.clearRefine();
            });
        }
    }

    if (this.ui.displaylayers.length > 0) {
        div = this.createDD("DisplayLayers", true);
        for (var i = 0; i < this.ui.displaylayers.length; i++) {
            var dl = { name: this.ui.displaylayers[i], curr: true };
            btn = this.createSkinButton(dl.name, "btnRTDisplayLayer", dl, div);
            btn.addEventListener("click", function () {
                var dl = this.data;
                if (dl.name.indexOf('#') != -1) {
                    scene.groupSet(dl.name, 'visible', 1);
                } else {
                    dl.curr = !dl.curr;
                    scene.groupSet(dl.name, 'visible', dl.curr ? 1 : 0);
                }
                scene.clearRefine();
            });
        }
    }
	
	//New Navigation controls
	if (scene && scene._nav){
		div = this.createDD("Navigation");
		div.id = "divNavigation";
		
		this.createSkinSlider("Min Dolly", "_navMinDolly", "1", "999", "1", div);	
		this.createSkinSlider("Max Dolly", "_navMaxDolly", "2", "1000", "1", div);
		this.createSkinSlider("Zoom Speed", "_navDollySpeed", "0.0004", "0.02", "0.0002", div);
		this.createSkinSlider("Rotation Speed", "_navRotationSpeed", "0.0005", "0.05", "0.0005", div);
		this.createSkinSlider("Pan Speed", "_navPanSpeed", "0.005", "0.5", "0.005", div);
		this.createSkinSlider("Decay", "_navDecay", "0.01", "0.99", "0.01", div);
		this.createSkinSlider("Decay Life", "_navMode2DecayHalflife", "0", "300", "5", div);
		this.createSkinSlider("Desired Target Speed", "_navDesiredTargetSpeed", "0.01", "0.99", "0.01", div);
		
		/*
		"Touch Sensitivity" window.touchSensitivity
		"Touch Pan Zoom"	window.touchZoomPan 
		*/
		
		//Save & download button
		var divbtn = document.createElement("div");
		divbtn.className="row justify-content-start";
		divbtn.style["padding-top"]="5px";
	
		var divbtncol = document.createElement("div");
		divbtncol.className="col-sm-2";
		divbtncol.style["padding-left"]="5px";
		divbtncol.style["padding-right"]="5px";
		
 		divbtncol.parentDiv = divbtn;
 		divbtn.appendChild(divbtncol);
		divbtn.parentDiv = div;
		div.appendChild(divbtn);
	
		btn = this.createSkinButton("Download settings", "btnExportNav", this, divbtncol);
		btn.addEventListener("click", function () {
			this.data.downloadNavigationSettings("navsettings.json");
		});
		
		//Load button
		var fileinput = document.createElement("input");
		fileinput.type = "file";
		fileinput.id = "file-input";
		fileinput.accept="application/JSON";
		//fileinput.parentDiv = div;
		//div.appendChild(fileinput);
		
		divfile = document.createElement("div");
		divfile.className="row justify-content-start";
		divfile.style["padding-top"]="5px";
		
		divfile.parentDiv = div;
		div.appendChild(divfile);
		
		divbtncol = document.createElement("div");
		divbtncol.className="col-sm-2";
		divbtncol.style["padding-left"]="5px";
		divbtncol.style["padding-right"]="5px";
		
		divbtncol.parentDiv = divfile;
		divfile.appendChild(divbtncol);
	
		btn = this.createSkinButton("Load settings", "btnLoadNav", this, divbtncol);
		
		fileinput.parentDiv = divfile;
		divfile.appendChild(fileinput);
		
		btn.addEventListener("click", function () {
			if(document.querySelector("#file-input").files.length == 0) {
				alert('Error : No file selected');
				return;
			}

			// file selected by user
			let file = document.querySelector("#file-input").files[0];

			// new FileReader object
			let reader = new FileReader();
			reader.skin = this.data;
			// event fired when file reading finished
			reader.addEventListener('load', function(e) {
				let text = e.target.result;
				let newNav = JSON.parse(text);
				for (const property in newNav) {
				  scene._nav[property] = newNav[property];
				}
				this.skin.updateNavUI();
			});

			// event fired when file reading failed
			reader.addEventListener('error', function() {
				alert('Error : Failed to read file');
			});

			// read file as text file
			reader.readAsText(file);
		});
	}
	
};
//TODO: Add function to update navigation controls with the current scene._nav variables.

window.addEventListener('DOMContentLoaded', function () {
    skin = new infinityrt_skin("config.json");
});
