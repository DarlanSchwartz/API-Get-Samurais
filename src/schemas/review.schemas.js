import joi from 'joi';

export const ReviewSchema = joi.object({
    review_text: joi.string().required(),
    rating:joi.number().integer().required(),
    service_id:joi.number().integer().required(),
    writer_id:joi.number().integer().required(),
});