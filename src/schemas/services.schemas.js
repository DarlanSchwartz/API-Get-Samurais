import joi from 'joi';

export const ServiceSchema = joi.object({
    name: joi.string().required(),
    ownerId:joi.number().integer().required(),
    description: joi.string().required(), 
    category: joi.number().integer().required(), 
    photo: joi.string().uri().required(),
    price:joi.number().integer().required(), 
    available:joi.boolean().required()
});


export const ServiceAvailableSchema = joi.object({
    available:joi.boolean().required()
});