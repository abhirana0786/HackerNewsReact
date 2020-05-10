import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SplineChart extends Component {
    render() {
        const options = {
            animationEnabled: true,
            axisX: {
                title: "ID"
            },
            axisY: {
                title: "Votes",
                includeZero: true,
                interval: 250
            },
            data: [{
                type: "spline",
                dataPoints: [
                    { label: 213, y: 500 },
                    { label: 324, y: 550 },
                    { label: 624, y: 750 },
                    { label: 57, y: 600 },
                    { label: 87, y: 800 },
                    { label: 1, y: 750 }
                ]
            }]
        }

        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default SplineChart;