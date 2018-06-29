import React,{Component} from 'react';
import {Pie} from 'react-chartjs-2';
 
class Piechart extends Component{
    constructor(props){
        super();
        this.state={
            data1:
                {
                labels:["Visually impaired people","People without visual impair "],
                datasets: [{
                label: "My First dataset",
                backgroundColor: ["rgb(7,160,170)","rgb(64,255,179)"],
                borderColor: 'rgb(36, 79, 62)',   
                data: [62,38],
                }],
            },
            options:{
                legend:{
                    labels:{
                        fontColor:"white"
                    }
                }
            },
            data2:
            {
            labels:["Cataract","Glaucoma"],
            datasets: [{
            label: "My First dataset",
            backgroundColor: ["rgb(7,160,170)","rgb(64,255,179)"],
            borderColor: 'rgb(36, 79, 62)',   
            data: [51,8],
            }],
        },
        options:{
            legend:{
                labels:{
                    fontColor:"white"
                }
            }
        },
        data3:
                {
                labels:["People without any visual impairment ","People with visual impairments"],
                datasets: [{
                label: "My First dataset",
                backgroundColor: ["rgb(7,160,170)","rgb(64,255,179)"],
                borderColor: 'rgb(36, 79, 62)',   
                data: [78,22],
                }],
            },
            options:{
                legend:{
                    labels:{
                        fontColor:"white"
                    }
                }
            }
        }
    }   
    
    render(){
        return(
        <div class="stats">
            <div class="stats-tile">
            <h3> The number of visually impaired people in the world</h3>
            < Pie data={this.state.data1} options={this.state.options} />
            </div>
            <div class="stats-tile">
            <h3>The number of visually impaired people in Bulgaria </h3>
            < Pie data={this.state.data3} options={this.state.options} />
            </div>
            <div class="stats-tile">
            <h3>Most common causes for blindness</h3>
            < Pie data={this.state.data2} options={this.state.options} />
            </div>
          </div>
        )
    }
}
export default Piechart;