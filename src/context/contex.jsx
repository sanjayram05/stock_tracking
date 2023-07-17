import { useEffect } from "react";
import { createContext } from "react";
import {useState} from 'react';
import finhub from '../api/finhub'
export const AppContext=createContext();
let data;
export const AppProvider=(props)=>{
    const [watchList,setWatchList]=useState(['GOOGL','MSFT','AMZN'])
    const [response,setResponse]=useState([]);
    const addToList=(symbol)=>{
        if(watchList.indexOf(symbol)===-1)
        setWatchList([...watchList,symbol]);
    }
    const removeRow=(symbol)=>{
        const temp=watchList.filter((value)=>value!==symbol)
        setWatchList(temp);
    }
    useEffect(()=>{
            const fetchData=async()=>{
                try{
                const responses= await Promise.all(watchList.map((stock)=>{ return finhub.get('/quote',{params:{
                    symbol:stock
                }
                
                })}))
                console.log(responses);
                data=responses.map((response)=>{
                    return {
                        data:response.data,
                        symbol:response.config.params.symbol
                    }
                })
                setResponse(data);
                
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

    return (<AppContext.Provider value={{response,addToList,removeRow}}>
        {props.children}
    </AppContext.Provider>)

}