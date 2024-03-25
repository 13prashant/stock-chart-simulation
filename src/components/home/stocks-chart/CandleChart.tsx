import ReactApexChart from "react-apexcharts";

export default function CandleChart({
  id,
  seriesData,
  seriesDataLinear,
}: {
  id: string;
  seriesData: any;
  seriesDataLinear: any;
}) {
  const options = {
    chart: {
      type: "candlestick",
      height: 290,
      id,
      toolbar: {
        autoSelected: "pan",
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#3C90EB",
          downward: "#DF7D46",
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
  };

  const optionsBar = {
    chart: {
      height: 160,
      type: "bar",
      brush: {
        enabled: true,
        target: id,
      },
      selection: {
        enabled: true,
        // xaxis: {
        //   min: new Date("1 Dec 2022").getTime(),
        //   max: new Date("25 Mar 2024").getTime(),
        // },
        fill: {
          color: "#ccc",
          opacity: 0.4,
        },
        stroke: {
          color: "#0D47A1",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "80%",
        colors: {
          ranges: [
            {
              from: -1000,
              to: 0,
              color: "#F15B46",
            },
            {
              from: 1,
              to: 10000,
              color: "#FEB019",
            },
          ],
        },
      },
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        offsetX: 13,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };

  return (
    <div className="chart">
      <div className="chart-box">
        <div id="chart-candlestick">
          <ReactApexChart
            // @ts-expect-error fix
            options={options}
            series={[{ data: seriesData }]}
            type="candlestick"
            height={290}
          />
        </div>
        <div id="chart-bar">
          <ReactApexChart
            // @ts-expect-error fix
            options={optionsBar}
            series={[{ name: "volume", data: seriesDataLinear }]}
            type="bar"
            height={160}
          />
        </div>
      </div>
    </div>
  );
}
