import db from "../database/database.connection.js";

export async function userExists(email) {
    try {
        const userExists = await db.query(`SELECT * FROM users WHERE "email"=$1`, [email]);
        return userExists.rowCount > 0;
    } catch (error) {
        return null;
    }
}

export async function createUser(name, email, password,cellphone,city) {
    try {
        const user = await db.query(`INSERT INTO users ("name", "email" ,"password","cellphone","city_name") VALUES ( $1, $2, $3,$4,$5 )`, [name, email, password,cellphone,city]);
        return user;
    } catch (error) {
        return null;
    }
}

export async function userCanLogin(email,password) {
    try {
        const userInfo = await db.query(`SELECT * FROM users WHERE "email"=$1`, [email]);
        if (userInfo.rowCount == 0 || userInfo.rows[0].password !== password) return false;
        return true;
    } catch (error) {
        return false;
    }
}

export async function getInfoFromUser(email) {
    try {
        const query = `
            SELECT u.id, u.name,
                   COALESCE(SUM(s."visitCount"), 0) AS "visitCount",
                   array_agg(json_build_object('id', s.id, 'url', s.url, 'shortUrl', s.shorturl, 'visitCount', s."visitCount")) AS "shortenedUrls"
            FROM users u
            LEFT JOIN short_urls s ON u.id = s.owner_id
            WHERE u.email = $1
            GROUP BY u.id, u.name
        `;
        
        const userInfo = await db.query(query,[email]);
        
        const user = userInfo.rows[0];
        user.visitCount = user.visitCount || 0;
        if(userInfo.rows[0].shortenedUrls[0].id == null) userInfo.rows[0].shortenedUrls = [];
        return user;
    } catch (error) {
        return null;
    }
}

export async function createUserSession(email,generatedToken) {
    try {
        const session = await db.query(`INSERT INTO sessions ("email","token") VALUES ($1,$2)`, [email, generatedToken]);
        return session;
    } catch (error) {
        return null;
    }
}



