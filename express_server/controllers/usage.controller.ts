import repo from "../repositories/usage.repository";
import { Request, Response } from "express";
import usage from "../models/usage";

export default class {
  static async getAllUsages(req: Request, res: Response, next: Function) {
    let usages = await repo.getAllUsages();
    return res.send({ usages });
  }

  static async getusageById(req: Request, res: Response, next: Function) {
    let usage = await repo.getUsageById(req.params.id);
    if (!usage) {
      return res.status(404).send(usage);
    }
    return res.send({ usage });
  }

  static async createUsage(req: Request, res: Response, next: Function) {
    if (!req.body.data) {
      const err: Error = new Error("All usageData are required.");
      return next(err);
    }
    const userID = req.body.userId;
    const data = req.body.data;
    const success = await repo.bulkInsertUsage(data, userID);
    return res.send({ success, usage: success });
  }

  static async updateusage(req: Request, res: Response, next: Function) {
    if (!req.body.id || !req.body.date || !req.body.cpu_hours) {
      const err: Error = new Error(
        "usage id, date and cpu_hours are required."
      );
      return next(err);
    }
    let success = await repo.updateUsage(req.body);
    return res.send({ success, usage: req.body });
  }

  static async deleteUsage(req: Request, res: Response, next: Function) {
    if (!req.params.id) {
      const err: Error = new Error("Usage id is required.");
      return next(err);
    }
    let deleted = await repo.deleteUsage(Number(req.params.itemId));
    return res.send({ success: deleted });
  }
}
