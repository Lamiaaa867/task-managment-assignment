import joi from 'joi'
export const signUpSchema={
    body:joi.object({
        username:joi.string().min(3).max(10).required(),
        email:joi.string().email({tlds:{allow:['com','net','org']}}).required(),
        password:joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
        copyPassword:joi.valid(joi.ref('password')).required(),
        gender:joi.string().optional().required(),
        age:joi.number().required(),
        phone:joi.number().min(8).required(),
       
    }).required(),
}
export const logInValidationSchema={
    body:joi.object({
        email:joi.string().email({tlds:{allow:['com','net','org']}}).required(),
        password:joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
    })
}