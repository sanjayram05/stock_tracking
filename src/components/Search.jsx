import React from 'react'
import finhub from '../api/finhub'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/contex'
function Search() {
    const {addToList} =useContext(AppContext)
    const [searchTerm,setSearchTerm]=useState('');
    const [result,setResult]=useState([]);
    const renderDropDown=()=>{
        const cls=searchTerm.length>0?'show':'notShow';
       return(
         <ul className={cls}>
           {result.map((result)=>{
            return <li key={result.symbol} onClick={()=>{addToList(result.symbol);setSearchTerm('')}}>{result.description} ({result.symbol})</li>
           })}
        </ul>
       )
    }
    useEffect(()=>{
        const fetchData=async()=>{
        try{

            const responses=await finhub.get('/search',{params:{
                q:searchTerm
            }})
            console.log(responses);
            setResult(responses.data.result)
        }
    
    catch(e){
        console.log(e);
    }
}
    if(searchTerm.length>0)
    fetchData();
    else
    setResult([])
    },[searchTerm])
  return (
    <div className='search'>
      <input type='text' placeholder='Enter the stock name' id='search' onChange={(e)=>{setSearchTerm(e.target.value)}} />
      {renderDropDown()}
    </div>
  )
}

export default Search
