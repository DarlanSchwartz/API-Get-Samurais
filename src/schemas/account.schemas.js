import joi from 'joi';

export const UserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
})

export const LoginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
})