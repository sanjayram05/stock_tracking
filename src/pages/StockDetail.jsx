import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import { useEffect } from 'react';
import finhub from '../api/finhub';
import StockChart from '../components/StockChart';
import { StockData } from '../components/StockData';
const formatData=(data)=>{
    return data.t.map((el,index)=>{
        return {
            x:el*1000,
            y:Math.floor(data.c[index])
        }
    })
}

function StockDetail() {
    const{symbol} =useParams();
    const [chartData,setChartData]=useState({});
    useEffect(()=>{
        const date=new Date();
        const currentTime=Math.floor(date.getTime()/1000)
        let oneDay;
        if(date.getDay()===6)
        oneDay=currentTime-2*24*60*60;
        else if(date.getDay()===0)
        oneDay=currentTime-3*24*60*60;
        else 
        oneDay=currentTime-24*60*60;
        const oneWeek=currentTime-7*24*60*60;
        const oneYear=currentTime-365*24*60*60;
        const fetData=async()=>{
            const responses=await Promise.all([finhub.get('/stock/candle',{params:{
                symbol,
                from:oneDay,
                to:currentTime,
                resolution:30
            }}),
            finhub.get('/stock/candle',{params:{
                symbol,
                from:oneWeek,
                to:currentTime,
                resolution:60
            }}),
            finhub.get('/stock/candle',{params:{
                symbol,
                from:oneYear,
                to:currentTime,
                resolution:'W'
            }})
        ])

        setChartData({
            day:formatData(responses[0].data),
            week:formatData(responses[1].data),
            year:formatData(responses[2].data)

        })
        }
        fetData();
    },[])

      return (
    <div className='detail'>
        {chartData && <div> 
            <StockChart data={chartData} symbol={symbol}/>
            <StockData symbol={symbol} />   
    </div>}
       
    </div>
  )
}

export default StockDetail
