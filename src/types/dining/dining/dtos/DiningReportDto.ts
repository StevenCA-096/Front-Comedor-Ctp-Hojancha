export interface DiningReportDto {
  period: PeriodInfo;
  summary: ReportSummary;
  paymentMethods: PaymentMethods;
  mealComparison: MealComparison;
  dailyTimeSeries: DailyTimeSeries[];
  weeklyTrends: WeeklyTrend[];
}

export interface PeriodInfo {
  startDate: string;
  endDate: string;
  daysCount: number;
}

export interface ReportSummary {
  totalStudents: number;
  totalRevenue: number;
  totalExpectedRevenue: number;
  avgDailyRevenue: number;
  avgDailyStudents: number;
  totalDinings: number;
}

export interface PaymentMethods {
  [paymentMethod: string]: PaymentMethodDetail;
}

export interface PaymentMethodDetail {
  count: number;
  amount: number;
}

export interface MealComparison {
  lunch: MealStats;
  dinner: MealStats;
}

export interface MealStats {
  totalStudents: number;
  totalRevenue: number;
  avgPerService: number;
  servicesCount: number;
}

export interface DailyTimeSeries {
  date: string;
  lunch: MealDayStats;
  dinner: MealDayStats;
  total: MealDayStats;
}

export interface MealDayStats {
  students: number;
  revenue: number;
  expectedRevenue: number;
}

export interface WeeklyTrend {
  dayName: string;
  dayNumber: number;
  avgStudents: number;
  avgRevenue: number;
  occurrences: number;
}