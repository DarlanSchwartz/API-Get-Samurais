import db from "../database/database.connection.js";

export default async function validateAuth(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  
  if (!token) return res.sendStatus(401);
  
  try {
    const userExists = await db.query(`SELECT * FROM sessions WHERE "token"=$1`, [token]);

    if (userExists.rowCount == 0) return res.sendStatus(401);

    res.locals = {user: userExists.rows[0]};

  } catch (err) {
    res.status(500).send(err.message);
  }
  
  next();
}