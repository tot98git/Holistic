import React,{Component} from 'react';
import axios from "axios";
class Results extends Component{
    constructor(props){
		super(props);
		this.state={
            inputOccur:["1","3"],
            testing:["2","3"]
        }
        
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
    expandExplanation(evt){
		var dataCollapsed =false;
		if(evt.target.parentNode.nextSibling.nextSibling.getAttribute("data-collapsed")=="false"){
			this.collapseElement(evt.target.parentNode.nextSibling.nextSibling);
		}
		else if(evt.target.parentNode.nextSibling.nextSibling.getAttribute("data-collapsed")=="true"){
			this.expandElement(evt.target.parentNode.nextSibling.nextSibling);
        }
    }

    componentDidMount(){
    }
    textReturns(index){
		switch(index){
			case 0:{
				return "Not using name attributes in inputs";break;
			}
			case 1:{
				return "Not using type attributes in inputs"
			}
			case 2:{
				return "Not using labels for inputs"
			}
			case 3:{
				return "Not using aria-labels attributes in inputs"
			}
			case 4:{
				return "Not using aria-checked attributes in radio and checkboxes"
			}
		}
	}
	explanationReturns(index){
		switch(index){
			case 0:{
				return "Not using names in inputs is wrong because you can't process the form in the server.";break;
			}
			case 1:{
				return "Not using type attributes can't let the accessible user now what type of data are they supposed to enter. "
			}
			case 2:{
				return "Not using labels for inputs can't let accessible user know what context are they supposed to type the required answer in. "
			}
			case 3:{
				return "Not using aria-labels attributes in inputs can't let accessible user know what context are they supposed to type the required answer in."
			}
			case 4:{
				return "Not using aria-checked attributes in radio and checkboxes can't let the accessible user know if the button has been checked or not."
			}
		}
	}
   /*componentWillMount(){
		axios.get('/data').then(res=>{
			this.setState({inputOccur:res.data});
			console.log(this.state.inputOccur);
	});
}*/
    render(){
        return(
		<div>{
        this.props.inputs.map((ele,index)=>{return (
		ele!=0?
        <div class="results-tile negative">
            <div class="tile-problem" onClick={(e)=>{this.expandExplanation(e)}}>
                {this.textReturns(index)}
            </div>
            <div class="tile-occur">
                {"Appears "+ ele+" times"}
            </div>
            <div class="tile-explanation" data-collapsed="false">
                <div>{this.explanationReturns(index)}</div>
            </div>
        </div>
		:""
		)})}
		</div>
            )
    }
}
export default Results;