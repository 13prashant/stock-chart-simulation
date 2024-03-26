import { useEffect, useMemo, useState } from "react";
import useApi from "../../../hooks/useApi";
import useIntervalApi from "../../../hooks/useIntervalApi";
import CandleChart from "./CandleChart";
import { getFormattedStockData } from "../helpers";

export default function StocksChart() {
  const [equity] = useState("IBM"); // Put equity you want stock data for
  const [hasIntradayStocksLoadedOnce, setHasIntradayStocksLoadedOnce] =
    useState(false);

  const {
    data: monthlyStocks,
    loading: areMonthlyStocksLoading,
    error: monthlyStocksError,
  } = useApi(
    `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${equity}&apikey=${
      import.meta.env.VITE_ALPHA_VANTAGE_API_KEY
    }`
  );

  const {
    data: intradayStocks,
    loading: areIntradayStocksLoading,
    error: intradayStocksError,
  } = useIntervalApi(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${equity}&interval=1min&apikey=${
      import.meta.env.VITE_ALPHA_VANTAGE_API_KEY
    }`
  );

  useEffect(() => {
    // Set the flag to true once intraday data has loaded at least once
    if (!areIntradayStocksLoading && intradayStocks) {
      setHasIntradayStocksLoadedOnce(true);
    }
  }, [areIntradayStocksLoading, intradayStocks]);

  // Check if intraday data has been loaded at least once
  const shouldShowIntradayLoading =
    !hasIntradayStocksLoadedOnce && areIntradayStocksLoading;

  const monthlyStocksData = useMemo(
    () => getFormattedStockData(monthlyStocks, "Monthly Time Series"),
    [monthlyStocks]
  );

  const intradayStocksData = useMemo(
    () => getFormattedStockData(intradayStocks, "Time Series (1min)"),
    [intradayStocks]
  );

  return (
    <section className="stocks-chart">
      {areMonthlyStocksLoading ? (
        <h3>Loading...</h3>
      ) : monthlyStocksError ? (
        <h3>{monthlyStocksError}</h3>
      ) : !monthlyStocksData?.length ? (
        <h3>No data available</h3>
      ) : (
        <>
          <h1>
            Historical Stocks Chart for the equity: <i>{equity}</i>
          </h1>

          <CandleChart
            id="monthlyCandles"
            seriesData={monthlyStocksData}
            seriesDataLinear={monthlyStocksData}
          />
        </>
      )}

      {shouldShowIntradayLoading ? (
        <h3>Loading...</h3>
      ) : intradayStocksError ? (
        <h3>{intradayStocksError}</h3>
      ) : !intradayStocksData?.length ? (
        <h3>No data available</h3>
      ) : (
        <>
          <h1>
            Intraday Stocks Chart for the equity: <i>{equity}</i>
          </h1>

          <CandleChart
            id="intradayCandles"
            seriesData={intradayStocksData}
            seriesDataLinear={intradayStocksData}
          />
        </>
      )}
    </section>
  );
}
