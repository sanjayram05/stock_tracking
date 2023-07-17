import React, { useState } from 'react'
import finhub from '../api/finhub';
import { useEffect } from 'react';
import { BsFillCaretDownFill } from "react-icons/bs"
import { BsFillCaretUpFill } from "react-icons/bs"
function Slide() {
    const [watchList,setWatchList]=useState(['GOOGL','MSFT','AMZN']);
    const [response,setResponse]=useState();
    useEffect(()=>{
        const fetchData=async()=>{
            try{
            const responses= await Promise.all(watchList.map((stock)=>{ return finhub.get('/quote',{params:{
                symbol:stock
            }
            
            })}))
            console.log(responses);
            let data;
            data=responses.map((response)=>{
                return {
                    data:response.data,
                    symbol:response.config.params.symbol
                }
            })

            setResponse([...data]);
            console.log(data);
        }

    
    catch(e){
        let temp=[];
        for(let i=0;i<watchList.length-1;i++)
        temp[i]=watchList[i];
        setWatchList(temp);
        console.log(e);
    }
}
fetchData();
},[watchList])
  return (
    <div>   
        {response &&
         <div id='section'>
              <div className='centerS'>
      <h4>{response[0].symbol}</h4>
        <p className={response[0].data.d>0?'green centerO':'red centerO'}>{response[0].data.d}{response[0].data.d>0?<BsFillCaretUpFill/>:<BsFillCaretDownFill />}</p>
        </div>
      <div className='centerS'>
      <h4>{response[1].symbol}</h4>
        <p className={response[1].data.d>0?'green centerO':'red centerO'}>{response[1].data.d}{response[1].data.d>0?<BsFillCaretUpFill/>:<BsFillCaretDownFill />}</p>
        </div>
        <div className='centerS'>
      <h4>{response[2].symbol}</h4>
        <p className={response[2].data.d>0?'green centerO':'red centerO'}>{response[2].data.d}{response[2].data.d>0?<BsFillCaretUpFill/>:<BsFillCaretDownFill />}</p>
        </div>
    </div>
}
    </div>

  )
}

export default Slide
