import React from 'react'
import { AppContext } from '../context/contex'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { BsFillCaretDownFill } from "react-icons/bs"
import { BsFillCaretUpFill } from "react-icons/bs"
function StockList() {
  const navigate=useNavigate();
  const handleClick=(symbol)=>{ 
    navigate(`detail/${symbol}`)
  }
    const {response,removeRow}=useContext(AppContext);

    return (
    <div className='tb'>
      <table>
        <thead>
            <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Last</th>
                <th scope='col'>Chg</th>
                <th scope='col'>Chg%</th>
                <th scope='col'>High</th>
                <th scope='col'>Low</th>
                <th scope='col'>Open</th>
                <th scope='col'>Close</th>
            </tr>
        </thead>
        <tbody>
               {response.map((res)=>{
                return(<tr onClick={()=>handleClick(res.symbol)} className='row'>
                    <th scope='row'>{res.symbol}</th>
                    <td>{res.data.c}</td>
                    <td className={res.data.d>0?'green centerO':'red centerO'}><span className='center'>{res.data.d}{res.data.d>0?<BsFillCaretUpFill/>:<BsFillCaretDownFill />}</span></td>
                    <td className={res.data.d>0?'green centerT':'red centerT'}><span className='center'>{res.data.dp}{res.data.dp>0?<BsFillCaretUpFill/>:<BsFillCaretDownFill />}</span></td>
                    <td>{res.data.h}</td>
                    <td>{res.data.l}</td>
                    <td>{res.data.o}</td>
                    <td>{res.data.pc}</td>
                    <button className='remove'   onClick={(e)=>{e.stopPropagation();removeRow(res.symbol)}}>Remove</button>
                </tr>)})}
        </tbody>
        
      </table>
    </div>
  )
}

export default StockList
