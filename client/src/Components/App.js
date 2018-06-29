import React, { Component } from 'react';
import '../Stylesheets/App.css';
import Pie from "./piechart.js";
import Logo from "../logo copy.png";
import Fontawesome from 'react-fontawesome';
import icon1 from "../icons_1.png";
import icon2 from "../icons_2.png";
import icon3 from "../icons_3.png";
import Results from "./results.js";
import reactIcon from "../react_icon.png";
import nodeIcon from "../react_icon copy.png";
import expressIcon from "../express_logo.png";
import axios from "axios";
class App extends Component {
	constructor(props){
		super(props);
		this.state={
			inputOccur:[],
			isLoading:false,
			value:null
		}
		this.inputOnChange = this.inputOnChange.bind(this);
	}
	componentWillMount(){
		axios.get('/data').then(res=>{
			this.setState({inputOccur:res.data});
			console.log(this.state.inputOccur);
	});
}
	expandElement(element){
		var sectionHeight=element.scrollHeight;
		element.style.height=sectionHeight+"px";
		element.addEventListener('transitionend',function thisFunc(e){
			element.removeEventListener('transitionend',thisFunc);
			element.style.height="auto";
		});
		element.setAttribute('data-collapsed',false);
	}
	collapseElement(element){
		var sectionHeight = element.scrollHeight;
		var elementTransition = element.style.transition;
		element.style.transition="";
		requestAnimationFrame(function(){
			element.style.height = sectionHeight+"px";
			element.style.transition=elementTransition;
			requestAnimationFrame(function(){
				element.style.height=0+"px";
			});
			element.setAttribute('data-collapsed',true);
		});
	}
	
	expandOptions(){
		if(document.getElementsByClassName("options")[0].getAttribute("data-collapsed")=="true"){
			console.log("true");
			this.expandElement(document.getElementsByClassName("options")[0]);
		}
		else{
			console.log("false");
			this.collapseElement(document.getElementsByClassName("options")[0]);
		}
	}
	expandCustom(){
		if(document.getElementsByClassName("test-everything-options")[0].getAttribute("data-collapsed")=="false"){
			window.requestAnimationFrame(()=>{document.getElementsByClassName("test-everything-options")[0].style.width="0px";})
		}
		else{
			console.log("false");
			document.getElementsByClassName("test-everything-options")[0].style.width="auto";
		}
	}
	expandExplanation(evt){
		var dataCollapsed =false;
		if(evt.target.parentNode.nextSibling.nextSibling.getAttribute("data-collapsed")=="false"){
			this.collapseElement(evt.target.parentNode.nextSibling.nextSibling);
		}
		else if(evt.target.parentNode.nextSibling.nextSibling.getAttribute("data-collapsed")=="true"){
			this.expandElement(evt.target.parentNode.nextSibling.nextSibling);
		}
	}
	inputOnChange(e){
		this.setState({value:e.target.value});
	}
	checkClick(e){
		this.collapseElement(document.getElementsByClassName("wrapper-head")[0]);
		this.setState({isLoading:true});
		axios.get('/data/'+encodeURIComponent(this.state.value)).then(res=>{
			this.setState({inputOccur:res.data,isLoading:false});
			console.log(this.state.inputOccur);
	});
		e.currentTarget.style.width="100%";
		e.currentTarget.previousSibling.style.width="0%";
		document.getElementsByClassName("test-results")[0].style.height="auto";
		document.getElementsByClassName("wrapper-foot")[0].style.transform="translateY(100%)";
		document.getElementsByClassName("wrapper-foot")[0].style.opacity="0";

	}
	fixMe(e){
		axios.get('/fix/'+encodeURIComponent(this.state.value));
	}

  render() {
    return (
      <div class="main-wrapper">
        <div class="wrapper-head">
          <div class="head-logo">
              <img src={Logo}/>
          </div>
          <div class="head-content">
          <h3 tabIndex="1">Developing tools to help disabled users enjoy the internet more</h3>
            <div class="content-desc">
							<div class="desc-tile"  tabIndex="2">
								<img src={icon1} alt="First icon"/>
								<h3>Raising inclusion in government e-services
								</h3>
							</div>
							<div class="desc-tile" tabIndex="3">
								<img src={icon2} alt="Second icon"/>
								<h3>Grasp the world wide content better</h3>
							</div>
							<div class="desc-tile" tabIndex="4">
								<img src={icon3} alt="Third icon"/>
								<h3>Expand your horizon</h3>
							</div>
            </div>
          </div>
        </div>
        <div class="wrapper-body">
            <div class="body-form">
              <div class="input-wrapper"
							><input type="text" placeholder="Type the website in here..." id="websiteInput" onChange={(e)=>{this.inputOnChange(e)}}/>
                <div class="checkbox fa fa-cog" id="settings" onClick={()=>this.expandOptions()}></div>
              </div>
              <button aria-role="button" placeholder="Check my website" onClick={(e)=>{this.checkClick(e)}}>{this.state.isLoading?"Analyzing":"Check my website"}</button>
              <div class="options" data-collapsed="false">
                  <div class="test-everything"> 
                    <div class="test-everything-icon" id="testEveryIcon" onClick={()=>{this.expandCustom()}}>
                      <Fontawesome className="fa fa-code"/>
                    </div>
                    <div class="test-everything-options"  data-collapsed="true">
                      <div class="option checkbox">inputs</div>
                      <div class="option checkbox">select</div>
                      <div class="option checkbox">imgs</div>
                      <div class="option checkbox">navigation</div>
                    </div>
                  </div>
									
                </div>
								<div class="test-results">								
									<Results inputs={this.state.inputOccur}/>
									<button id="fixme" onClick={(e)=>{this.fixMe(e)}}>Find me a fix</button>
								</div>
            </div>
						
        </div>
        <div class="wrapper-foot">
          <Pie/>
					<div class="technologies-used">
									<div class="technologies-tile">
										<img src={reactIcon} alt="reacIcon"/>
									</div>
									<div class="technologies-tile">
											<img src={nodeIcon} alt="reacIcon"/>
									</div>
									<div class="technologies-tile">
										<img src={expressIcon} alt="reacIcon"/>	
									</div>
								</div>
          <div class="copyright">
            All rights reserved
          </div>
        </div>
      </div>
    );
  }
}

export default App;
