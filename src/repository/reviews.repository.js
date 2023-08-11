import db from "../database/database.connection.js";

export async function createReview(writer_id, review_text, rating,service_id) {
    try {
        const review = await db.query(`INSERT INTO reviews ("writer_id", "review_text" ,"rating","service_id") VALUES ( $1, $2, $3,$4 )`, [writer_id, review_text, rating,service_id]);
        return review;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}