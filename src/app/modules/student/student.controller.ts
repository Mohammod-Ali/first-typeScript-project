import { Request, Response, json } from "express"
import { StudentServices } from "./student.service"
import Joi from 'joi'

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

        const studentSchema = Joi.object({
            id: Joi.string().required(),
            name: userNameSchema.required(),
            gender: Joi.string().valid('male', 'female', 'other').required(),
            dateOfBirth: Joi.string(),
            email: Joi. string().email().required(),
            contactNo: Joi.string().required(),
            emergencyContactNo: Joi.string().required(),
            bloodGroup: Joi.string().valid('A+', 'B-', 'O+', 'AB+', 'A+', 'O-'),
            presentAddress: Joi.string().required(),
            permanentAddress: Joi.string().required(),
            guardian: guardianSchema.required(),
            localGuardian: localGuardianSchema.required(),
            profileImg: Joi.string(),
            isActive: Joi.string().valid('active', 'blocked').default('active'),
        })



        const {student : studentData} = req.body

       const { error , value} = studentSchema.validate(studentData)


        const result = await StudentServices.createStudentIntoDB(studentData)
    
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