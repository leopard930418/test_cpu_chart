import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainChart from "./MainChart";
import axios from "axios";
import authHeader from "../../../auth/auth";
import CSVReader from "react-csv-reader";

export default function Home() {
  const [cpuUsageData, setCpuUsageData] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [usageAve, setUsageAve] = useState(0);
  const [usageMax, setUsageMax] = useState(0);
  const [usageMin, setUsageMin] = useState(0);
  const navigation = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigation("/auth/signIn");
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/usage/getData", {
        headers: authHeader(),
      })
      .then((res: any) => {
        console.log(">>>>>>>>>>>>>", res.data.usages);
        const usageData =
          res.data.usages.length > 0
            ? res.data.usages.map((i: any) => {
                return {
                  x: i.date * 1,
                  y: i.cpu_hours * 1,
                  color: "#ffffff",
                };
              })
            : [];
        console.log("============", usageData);
        // setCpuUsageData(usageData);
      });
  }, []);
  /////////////////////////////////////////////////////
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, "_"),
  };
  const handleForce = (data: any, fileInfo: any) => {
    setDataAvailable(true);
    var date = new Date();
    var ave = 0;
    var min = data[0].cpu_hours;
    var max = 0;
    const chartData =
      data.length > 0
        ? data.map((i: any) => {
            ave += i.cpu_hours;
            max = Math.max(i.cpu_hours, max);
            min = Math.min(i.cpu_hours, min);
            date.setFullYear(i.year);
            date.setMonth(i.month);
            date.setDate(i.day);
            return {
              x: date.getTime(),
              y: i.cpu_hours * 1,
            };
          })
        : [];
    setCpuUsageData(chartData);
    setUsageAve(Math.round((ave / data.length) * 100) / 100);
    setUsageMax(max);
    setUsageMin(min);
    axios
      .post(
        "http://localhost:8080/api/usage/getData",
        {
          data: chartData,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        console.log("Success");
      });

    // console.log("cpuUsageData", cpuUsageData);
    // console.log(data, fileInfo);
  };
  return (
    <div className="w-full flex flex-row flex-grow">
      <div className="w-full xl-max:w-2/3 px-4 sm:px-32 pt-32 sm:pt-24 flex flex-col justify-between flex-grow">
        <Stack spacing={2}>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-5xl text-white">Full-Stack Challenge</div>
            <CSVReader
              cssClass="csv-reader-input"
              label="Import your csv file"
              onFileLoaded={handleForce}
              parserOptions={papaparseOptions}
              inputId="ObiWan"
              inputName="ObiWan"
              inputStyle={{ color: "red" }}
            />
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-row space-x-8 w-full sm:w-1/3">
              <div className="text-lime-500">Average_CPU_Usage :</div>
              <div className="text-white"> {usageAve} %</div>
            </div>
            <div className="flex flex-row space-x-8 w-full sm:w-1/3">
              <div className="text-lime-500">Max_CPU_Usage :</div>
              <div className="text-white"> {usageMax} %</div>
            </div>
            <div className="flex flex-row space-x-8 w-full sm:w-1/3">
              <div className="text-lime-500">Min_CPU_Usage :</div>
              <div className="text-white"> {usageMin} %</div>
            </div>
          </div>
          {dataAvailable ? (
            <MainChart cpuUsageData={cpuUsageData} />
          ) : (
            <div className="text-5xl text-white text-center pt-32">
              Please import your CSV file
            </div>
          )}
        </Stack>
      </div>
    </div>
  );
}
