import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { StudentValidationSchema } from '../student.validation';
// import Joi from 'joi'

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using zod
    // const studentValidationSchema = z.object({
    //     id: z.string(),
    //     name: z.object({
    //         firstName: z.string().max(20, {message: 'First name can not be more than 20 characters'})
    //     })
    // })

    // data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData)

    // here check the error
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error: error.details,
    //   });
    // }

    const { student: studentData } = req.body;

    //data validation using zod

    const zodparsedData = StudentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodparsedData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: unknown) {
    let message = 'Something went wrong';

    if (err instanceof Error) {
      message = err.message;
    }
    res.status(500).json({
      success: false,
      message,
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err: unknown) {
    let message = 'Something went wrong';

    if (err instanceof Error) {
      message = err.message;
    }
    res.status(500).json({
      success: false,
      message,
      error: err,
    });
  }
};

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentsFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Students is retrieved successfully',
      data: result,
    });
  } catch (err: unknown) {
    let message = 'Something went wrong';

    if (err instanceof Error) {
      message = err.message;
    }
    res.status(500).json({
      success: false,
      message,
      error: err,
    });
  }
};

const deleteStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentsFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Students is deleted successfully',
      data: result,
    });
  } catch (err: unknown) {
    let message = 'Something went wrong';

    if (err instanceof Error) {
      message = err.message;
    }
    res.status(500).json({
      success: false,
      message,
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudents
};,
