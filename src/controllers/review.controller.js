import { createReview } from "../repository/reviews.repository.js";

export async function insertReview(req, res) {
    const {writer_id, review_text, rating,service_id} = req.body;
    try {
        await createReview(writer_id, review_text, rating,service_id);
        return res.status(201).send("Created review sucessfully!");
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}