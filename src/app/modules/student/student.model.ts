import { Schema, model } from 'mongoose';
import validator from 'validator';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';

const UserNameSchema = new Schema<UserName>({
    
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
            trim: true,
            maxlength: [20, 'First Name can not be more than 20 characters'],
            validate: {
                validator: function (value: string) {
                    const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
                    return firstNameStr === value
                },
                message: '{VALUE} is not capitalize format'
            }
        },
        middleName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: [true, 'Last Name is required'],
            validate: {
                validator: (value: string) => validator.isAlpha(value),
                message: '{VALUE} is not valid'
            }
        }
})

const guardianSchema = new Schema<Guardian>(
    {
        fatherName:  { type : String, required: true},
        fatherOccupation:  { type : String, required: true},
        fatherContactNo:  { type : String, required: true},
        motherName:  { type : String, required: true},
        motherOccupation:  { type : String, required: true},
        motherContactNo:  { type : String, required: true},
    }
)

const localGuardianSchema = new Schema<LocalGuardian>(
    {
        name: { type : String, required: true},
        occupation: { type : String, required: true},
        contactNo: { type : String, required: true},
        address: { type : String, required: true},
    }
)

const studentSchema = new Schema<Student>({
    id: { type: String, required: true, unique: true },
    name: {
        type: UserNameSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: '{VALUE} is not valid',
        },
        required: true,
    },
    dateOfBirth: {type : String },
    email: {
         type : String, 
         required: [true, 'Email is required'], 
         unique: true,
         validate: {
            validator: (value: string) => validator.isEmail(value),
            message: '{VALUE} is not a valid email'
         }
        },
    contactNo:  { type : String, required: true},
    emergencyContactNo:  { type : String, required: true},
    bloodGroup: {
        type: String,
        enum: ['A+', 'B-', 'O+', 'AB+', 'A+', 'O-'],

    },
    presentAddress: { type : String, required: true},
    permanentAddress: { type : String, required: true},
    guardian: {
        type: guardianSchema,
        required: true,
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true,
    },
    profileImg: {type : String},
    isActive: {
        type: String,
        enum: [ 'active', 'blocked'],
        default: 'active'
    }
})

export const StudentModel = model<Student>('Student', studentSchema)