import { z } from 'zod';
import studentValidationSchema from './student/student.Joi.validation';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name is required' })
    .max(20, { message: 'First Name can not be more than 20 characters' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First Name must be in capitalize format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father Name is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father Occupation is required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father Contact No is required' }),
  motherName: z.string().min(1, { message: 'Mother Name is required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother Occupation is required' }),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother Contact No is required' }),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local Guardian Name is required' }),
  occupation: z
    .string()
    .min(1, { message: 'Local Guardian Occupation is required' }),
  contactNo: z
    .string()
    .min(1, { message: 'Local Guardian Contact No is required' }),
  address: z.string().min(1, { message: 'Local Guardian Address is required' }),
});

export const StudentValidationSchema = z.object({
  id: z.string().min(1, { message: 'Student ID is required' }),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z
    .enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Email is not a valid email' }),
  contactNo: z.string().min(1, { message: 'Contact No is required' }),
  emergencyContactNo: z
    .string()
    .min(1, { message: 'Emergency Contact No is required' }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().min(1, { message: 'Present Address is required' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent Address is required' }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean()
});

export default studentValidationSchema;
