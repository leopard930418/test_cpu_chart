import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function MainChart({ cpuUsageData = [] }) {
  let options_local = {
    title: {
      text: "Cpu Usage",
      style: {
        color: "#ffffff",
        cursor: "default",
        fontSize: "20px",
      },
    },
    scrollbar: {
      enabled: false,
    },
    rangeSelector: {
      enabled: true,
      inputBoxBorderColor: "#ffffff",
      inputBoxHeight: 30,
      inputBoxWidth: 100,
      inputBoxBorderRadius: 8,
      inputStyle: { color: "#aaaaaa" },
      labelStyle: {
        color: "#ffffff",
        borderColor: "#ffffff",
        borderRadius: 2,
        height: "100px",
      },
      buttons: [
        {
          type: "month",
          count: 1,
          text: "1m",
          title: "View 1 month",
          events: {
            // click: function() {
            //     alert('Clicked button');
            // }
          },
        },
        {
          type: "month",
          count: 3,
          text: "3m",
          title: "View 3 months",

          events: {},
        },
        {
          type: "month",
          count: 6,
          text: "6m",
          title: "View 6 months",
        },
        {
          type: "ytd",
          text: "YTD",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
          title: "View 1 year",
        },
        {
          type: "year",
          count: 5,
          text: "5y",
          title: "View 6 years",
        },
        {
          type: "all",
          text: "All",
          title: "View All Data",
        },
      ],
    },
    chart: {
      backgroundColor: "rgba(0,0,0,0)",
      plotBackgroundColor: "rgba(0,0,0,0)",
      height: "500px",
      // events: {
      //   load: function() {
      //       const xAxis = this.xAxis[0];
      //       xAxis.setExtremes(xAxis.dataMin, xAxis.dataMin + xAxis.max - xAxis.min + 100000000);
      //   }
      // }
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%m/%d}",
      },
    },
    yAxis: [
      {
        //--- Primary yAxis
        min: 0,
        max: 100,
        tickInterval: 20,
        lineColor: "#52c41a",
        lineWidth: 2,
        labels: {
          format: "{value}",
          style: {
            color: "#52c41a",
          },
        },
        title: {
          text: "Usage(%)",
          style: {
            color: "#52c41a",
            cursor: "default",
            fontSize: "15px",
          },
        },
        gridLineWidth: "0px",

        opposite: false,
      },
    ],

    legend: {
      enabled: false,

      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      // floating: false,
      // x: 0, // -ve = left, +ve = right
      // y: -40, // -ve = up, +ve = down

      // labelFormat: "{name}",
      //   labelFormatter: function () {
      //     return this.name;
      //   },
      itemStyle: {
        color: "#aaaaaa",
        fontWeight: "bold",
        fontSize: 10,
      },
      // itemDistance: 20,
      itemWidth: 120,
      // width: 120,
      // padding: 8,

      borderWidth: 1,
      // borderColor: "#909090",
      // borderRadius: 0,
    },
    series: [
      {
        type: "area",
        name: "Usage",
        data: cpuUsageData,
        color: "#52c41a",
        yAxis: 0,
        showInNavigator: true,
        turboThreshold: 0,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 600,
          },
          chartOptions: {
            legend: {
              // floating: false,
              layout: "vertical",
              align: "center",
              verticalAlign: "bottom",
              x: 0,
              y: 0,
            },
            yAxis: [
              {
                labels: {
                  align: "right",
                  x: 0,
                  // enabled:false,
                  // y: -6
                },
                title: {
                  enabled: false,
                },
                showLastLabel: false,
              },
              {
                labels: {
                  align: "left",
                  // enabled:false,
                  x: 0,
                  // y: -6
                },

                showLastLabel: false,
              },
              {
                visible: false,
              },
            ],
          },
        },
      ],
    },
  };

  return (
    <div className="rounded-xl border border-blue_gray border-opacity-20  bg-opacity-5 p-4">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={options_local}
      />
    </div>
  );
}
