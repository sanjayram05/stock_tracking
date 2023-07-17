import React from 'react'
import StockList from '../components/StockList';
import Search from '../components/Search';
import Header from '../components/Header';
function StockOverview() {
    
  return (
    <div className='home'>
      <Header />
      <Search />
      <StockList />
    </div>
  )
}

export default StockOverview
