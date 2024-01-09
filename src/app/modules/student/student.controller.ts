import { Request, Response, json } from "express"
import { StudentServices } from "./student.service"
import Joi from 'joi'
import studentValidationSchema from "./student.validation"

const createStudent = async (req: Request, res: Response) => {
     
    try{

        // creating a schema validation using Joi

        // const JoiValidationSchema = Joi.object({
        //     id: Joi.string(),
        //     name: {
        //         firstName: Joi.string().max(20).required(),
        //         middleName: Joi.string().max(20),
        //         lastName: Joi.string().max(20)
        //     },
        //     gender: Joi.string().required().valid(['male', 'female', 'other'])
        // })

      



        const {student : studentData} = req.body

        const result = await StudentServices.createStudentIntoDB(studentData)

       const { error } = studentValidationSchema.validate(studentData)


        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            err: err,
        })
    }
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