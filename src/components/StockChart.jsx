import React, { useState } from 'react'
import Chart from 'react-apexcharts';
function StockChart({data,symbol}) {
    const {day,week,year}=data;
    const [timeFormat,setTimeFormat]=useState('24h');
    const determineTimeFormat=()=>{
        switch(timeFormat)
        {
            case '24h':
                return day
            case '7d':
                return week
            case '1y':
                return year
            default:
                return day
        }
    }
 
    let color
    if(determineTimeFormat()!==undefined)
    {
        color = determineTimeFormat()[determineTimeFormat().length - 1].y - determineTimeFormat()[0].y > 0 ? "#26C281" : "#ed3419"
    }
    const options = {
      colors: [color],
      title: {
        text: symbol,
        align: "center",
        style: {
          fontSize: "24px"
        }
      },
      chart: {
        id: "stock data",
        animations: {
          speed: 1300
        }
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false
        }
      },
      tooltip: {
        x: {
          format: "MMM dd HH:MM"
        }
      }
    }
  
  
    const series = [{
      name: symbol,
      data: determineTimeFormat()
    },]
    /*const renderButton=(button)=>{
        if(button===timeFormat)
        return 'btn-active'
        else
        return 'btn-notActive'

    }*/
  return (
    <div className='chart'>
        <Chart options={options} series={series} type="area" width="100%" />
      <button className={'24h'===timeFormat?'btn-active':'btn-notActive'} onClick={()=>setTimeFormat('24h')}>24h</button>
      <button className={'7d'===timeFormat?'btn-active':'btn-notActive'} onClick={()=>setTimeFormat('7d')}>7d</button>
      <button className={'1y'===timeFormat?'btn-active':'btn-notActive'} onClick={()=>setTimeFormat('1y')}>1y</button>
    </div>
  )
}

export default StockChart
