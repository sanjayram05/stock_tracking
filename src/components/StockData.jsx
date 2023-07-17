import { useState, useEffect } from "react"
import finhub from "../api/finhub"
export const StockData = ({ symbol }) => {

  const [stockData, setStockData] = useState()
  
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
       
        const response = await finhub.get("/stock/profile2", {
          params: {
            symbol
          }
        })
        console.log(response)
        if (isMounted) {
          setStockData(response.data)
        }
        
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    return () => (isMounted = false);
  }, [symbol])
  return <div>
    {stockData && (

      <div className="data">
          <div className="subdata">
            <span className="fw-bold">name: </span>
            {stockData.name}
          </div>
          <div className="subdata">
            <span className="fw-bold">country: </span>
            {stockData.country}
          </div>
          <div className="subdata">
            <span className="fw-bold">ticker: </span>
            {stockData.ticker}
          </div>
          <div className="subdata">
            <span className="fw-bold">Exchange: </span>
            {stockData.exchange}
          </div>
          <div className="subdata">
            <span className="fw-bold">Industry: </span>
            {stockData.finnhubIndustry}
          </div>
          <div className="subdata">
            <span className="fw-bold">MarketCap: </span>
            {stockData.marketCapitalization}
          </div>
          <div className="subdata">
            <span className="fw-bold">Shares Outstanding: </span>
            {stockData.shareOutstanding}
          </div>
          <div className="subdata">
            <span className="fw-bold">url: </span>
            <a href={stockData.weburl}>{stockData.weburl}</a>
          </div>
      </div>

    )
    }
  </div >
}