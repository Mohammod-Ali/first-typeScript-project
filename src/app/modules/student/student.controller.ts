import { Request, Response, json } from "express"
import { StudentServices } from "./student.service"
import {z} from 'zod'
import { StudentValidationSchema } from "../student.validation"
// import Joi from 'joi'
// import studentValidationSchema from "./student.validation"

const createStudent = async (req: Request, res: Response) => {
     
    try{
        // const studentValidationSchema = z.object({
        //     id: z.string(),
        //     name: z.object({
        //         firstName: z.string().max(20, {message: 'First name can not be more than 20 characters'})
        //     })
        // })

        const {student : studentData} = req.body


        //data validation using zod

        const zodparsedData = StudentValidationSchema.parse(studentData)

        
        // data validation using Joi
        // const { error, value } = studentValidationSchema.validate(studentData)

        const result = await StudentServices.createStudentIntoDB(zodparsedData)

    //   if(error){
    //     res.status(200).json({
    //         success: true,
    //         message: 'Student is created successfully',
    //         data: result,
    //     })
    //   }

    // }catch(err){
    //     res.status(500).json({
    //         success: false,
    //         message: 'Something went wrong',
    //         err: err,
    //     })
    // }
}

const getAllStudents = async (req: Request, res: Response) => {
    try{
    const result = await StudentServices.getAllStudentsFromDB()

    res.status(200).json({
        success: true,
        message: 'Students are retrieved successfully',
        data: result,
    })
    }catch(err){
     console.log(err);   
    }
}

const getSingleStudents = async (req: Request, res: Response) => {
    try{

    const {studentId} = req.params
     
    const result = await StudentServices.getSingleStudentsFromDB(studentId)

    res.status(200).json({
        success: true,
        message: 'Students is retrieved successfully',
        data: result,
    })
    }catch(err){
     console.log(err);   
    }
}

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudents,
}