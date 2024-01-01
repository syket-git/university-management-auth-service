import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

const guardianSchema = z.object({
  fatherName: z.string({ required_error: 'Father name is required' }),
  fatherOccupation: z.string({
    required_error: 'Father occupation is required',
  }),
  fatherContactNo: z.string({
    required_error: 'Father contact number is required',
  }),
  motherName: z.string({ required_error: 'Mother name is required' }),
  motherOccupation: z.string({
    required_error: 'Mother occupation is required',
  }),
  motherContactNo: z.string({
    required_error: 'Mother contact number is required',
  }),
  address: z.string({ required_error: 'Address is required' }),
});

const localGuardianSchema = z.object({
  name: z.string({ required_error: 'Local guardian name is required' }),
  occupation: z.string({
    required_error: 'Local guardian occupation is required',
  }),
  contactNo: z.string({
    required_error: 'Local guardian contact number is required',
  }),
  address: z.string({ required_error: 'Local guardian address is required' }),
});

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum(gender as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z
        .enum(bloodGroup as [string, ...string[]], {
          required_error: 'Blood group is required',
        })
        .optional(),
      email: z.string({ required_error: 'Email is required' }),
      contactNo: z.string({ required_error: 'Contact number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImage: z.string().optional(),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
