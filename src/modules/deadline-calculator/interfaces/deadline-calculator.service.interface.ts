export interface IDeadlineCalculatorService {
  calculateDeadline(submitDate: Date, turnaroundTime: number): Promise<Date>;
}
