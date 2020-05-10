/* eslint-disable array-callback-return */
import React from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SplineChart = (props) => {


    const chartData = [];
    props.data && props.data.hits && props.data.hits.map((data, index) => {
        let masterData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
        let oldData = masterData[masterData.map((val) => { return val.id }).indexOf(data.objectID)];
        // hide record
        let hideMasterData = localStorage.getItem('hide-data') ? JSON.parse(localStorage.getItem('hide-data')) : [];
        let hideOldData = hideMasterData[hideMasterData.map((val) => { return val }).indexOf(data.objectID)];
        if (!hideOldData) {
            chartData.push({ label: data.objectID, y: (oldData && oldData.points) ? oldData.points : data.points });
        }
    });
    const options = {
        animationEnabled: true,
        axisX: {
            title: "ID"
        },
        axisY: {
            title: "Votes",
            includeZero: true
        },
        data: [{
            type: "spline",
            dataPoints: chartData
        }]
    }

    return (
        <div>
            {chartData && (<CanvasJSChart options={options}
            /* onRef={ref => this.chart = ref} */
            />)}
        </div>
    );

}

export default SplineChart;