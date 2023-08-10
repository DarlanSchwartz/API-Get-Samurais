import db from "../database/database.connection.js";

export async function createFullService(body) {
    const { name, photo, description, price, category, available, ownerId } = body;
    try {
        const session = await db.query(`INSERT INTO services ("name","owner_id","photo","description","price","category","available") VALUES ($1,$2,$3,$4,$5,$6,$7)`, [name, ownerId, photo, description, price, category, available]);
        return session;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateServiceInfo(id, body) {
    const { name, photo, description, price, category, available, ownerId } = body;
    try {
        const query = `
            UPDATE services
            SET 
                "name" = $1,
                "owner_id" = $2,
                "photo" = $3,
                "description" = $4,
                "price" = $5,
                "category" = $6,
                "available" = $7
            WHERE id = $8
        `;
        
        const result = await db.query(query, [name, ownerId, photo, description, price, category, available, id]);

        return result;
        
    } catch (error) {

        console.log(error);
    }
}

export async function changeServiceAvailableStatus(id,value) {
    try {
        const query = `
            UPDATE services
            SET "available" = $1
            WHERE id = $2
        `;
        
        const result = await db.query(query, [value, id]);

        return result;
        
    } catch (error) {
        
        console.log(error);
    }
}

export async function findService(id) {
    try {
        const query = `SELECT services.*, users.name AS owner_name, users.city_name
        FROM services
        JOIN users ON services.owner_id = users.id
        WHERE services.id = $1
        `;
        
        const service = await db.query(query,[id]);
        
        return service.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function checkServiceOwnerShip(ownerId,serviceId) {
    try {
        const query = `SELECT * FROM services WHERE id = $1
        `;
        
        const service = await db.query(query,[serviceId]);
        
        return service.rows[0].owner_id == ownerId;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function removeService(id) {
    try {
        const query = `DELETE FROM services WHERE id = $1`;
        
        const result = await db.query(query,[id]);

        return result;
        
    } catch (error) {
        console.log(error);
    }
}

export async function findAllServices() {
    try {
        const query = `SELECT services.*, users.name AS owner_name, users.city_name
        FROM services
        JOIN users ON services.owner_id = users.id
        `;
        
        const services = await db.query(query,[]);
        
        return services.rows;
    } catch (error) {
        return null;
    }
}

export async function findUserServices(userId) {
    try {
        const query = `SELECT services.*, users.name AS owner_name, users.city_name
            FROM services
            JOIN users ON services.owner_id = users.id
            WHERE services.owner_id = $1
        `;
        
        const service = await db.query(query,[userId]);
        
        return service.rows;
    } catch (error) {
        return null;
    }
}

