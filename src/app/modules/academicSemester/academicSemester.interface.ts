import { Model } from 'mongoose';

type months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemester = {
  title: 'Autumn' | 'Summer' | 'Fall';

  year: number;
  code: '01' | '02' | '03';
  startMonth: months;
  endMonth: months;
};

export type IAcademicSemesterModel = Model<IAcademicSemester>;
