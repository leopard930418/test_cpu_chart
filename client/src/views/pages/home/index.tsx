import { Divider, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainChart from "./MainChart";
import axios from "axios";
import authHeader from "../../../auth/auth";

export default function Home() {
  const [cpuUsageData, setCpuUsageData] = useState([]);

  // const navigation = useNavigate();
  // useEffect(() => {
  //   navigation("/auth/signIn");
  // }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/data/", {
        headers: authHeader(),
      })
      .then((res: any) => {
        console.log("test data", res.data.result);
        var now = new Date();
        const chartData =
          res.data.result.length > 0
            ? res.data.result.map((i: any) => {
                now.setFullYear(i.year);
                now.setMonth(i.month);
                now.setDate(i.day);
                return {
                  x: now.getTime(),
                  y: i.cpu_hours * 1,
                  color: "#FF0000",
                };
              })
            : [];
        setCpuUsageData(chartData);
        console.log("cpuUsageData", cpuUsageData);
      });
  }, []);

  return (
    <div className="w-full flex flex-row flex-grow">
      <div className="w-full xl-max:w-2/3 px-4 sm:px-32 pt-32 sm:pt-24 flex flex-col justify-between flex-grow">
        <Stack spacing={2}>
          <div className="text-5xl text-white">Full-Stack Challenge</div>
          <MainChart cpuUsageData={cpuUsageData} />
        </Stack>
      </div>
    </div>
  );
}
