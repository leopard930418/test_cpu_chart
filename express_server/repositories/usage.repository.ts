import dao from "./dao";
import Usage from "../models/usage";

export default class {
  static async getAllUsages(): Promise<Usage[]> {
    const usages = await dao.all("SELECT * FROM usages", []);
    return <Usage[]>usages;
  }

  static async getUsageById(id: string): Promise<Usage> {
    const usage = await dao.get("SELECT * FROM usages WHERE id = ?", [id]);
    return <Usage>usage;
  }

  static async createUsage(item: Usage): Promise<boolean> {
    const stmt = `INSERT INTO usages (date, cpu_hours) VALUES (?,?);`;
    try {
      await dao.run(stmt, [item.date, item.cpu_hours]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async bulkInsertUsage(data: any, userId: number): Promise<any> {
    var stmt = `INSERT INTO usages (date, cpu_hours, userID) VALUES `;
    data.map((item: any) => {
      stmt += `(${item.x}, ${item.y}, ${userId}),`;
    });
    stmt = stmt.substring(0, stmt.length - 1) + ";";

    try {
      await dao.run(stmt, []);
      return true;
    } catch (err) {
      console.error(err);
      return stmt;
    }
  }

  static async updateUsage(item: Usage): Promise<boolean> {
    const stmt = `UPDATE usages SET date = ?, cpu_hours= ? WHERE id = ?;`;
    try {
      await dao.run(stmt, [item.date, item.cpu_hours, item.id]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  static async deleteUsage(itemId: number) {
    const stmt = `DELETE FROM usages WHERE id = ?;`;
    try {
      await dao.run(stmt, [itemId]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
