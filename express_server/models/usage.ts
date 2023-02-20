export default class {
  constructor(date: string, cpu_hours: number, userID: number) {
    this.date = date;
    this.cpu_hours = cpu_hours;
    this.userID = userID;
  }

  id!: number;
  date!: string;
  cpu_hours!: number;
  userID!: number;
}
