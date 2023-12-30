import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: IAcademicFaculty | Types.ObjectId;
};

export type IAcademicDepartmentModel = Model<IAcademicDepartment>;
