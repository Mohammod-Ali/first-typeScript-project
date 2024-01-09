import Joi from "joi";

const studentValidationSchema = Joi.object({
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

export default studentValidationSchema