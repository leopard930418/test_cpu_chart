import njwt from "njwt";
import repo from "../repositories/user.repository";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/user";

import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";

type CpuUsage = {
  year: string;
  month: string;
  day: string;
  cpu_hours: number;
};

export const getData = async (req, res) => {
  const csvFilePath = path.resolve(__dirname, "../../cpu_hours.csv");

  const headers = ["year", "month", "day", "cpu_hours"];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

  parse(
    fileContent,
    {
      delimiter: ",",
      columns: headers,
    },
    (error, result: CpuUsage[]) => {
      if (error) {
        console.error(error);
        return res.send([]);
      }
      console.log("Result", result);
      result.shift();
      return res.send({ result });
    }
  );
};
