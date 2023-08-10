import db from '../database/database.connection.js';
import { changeServiceAvailableStatus, checkServiceOwnerShip, createFullService, findAllServices, findService, findUserServices, removeService, updateServiceInfo } from '../repository/services.repository.js';

export async function createService(req, res) {
    try {
        await createFullService(req.body);
        return res.status(201).send("Created service sucessfully!");
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function getService(req, res) {
    try {
        const service = await findService(Number(req.params.id));
        if(!service) return res.sendStatus(404);
        return res.status(200).send(service);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function deleteService(req, res) {
    try {
        const isOwner = await checkServiceOwnerShip(res.locals.user.user_id,req.params.id);
        if(!isOwner) return res.sendStatus(401);
        const result = await removeService(Number(req.params.id));
        if(result.rowCount === 0) return res.sendStatus(404);
        return res.status(204).send("Deleted");
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function editService(req, res) {
    try {
        const isOwner = await checkServiceOwnerShip(res.locals.user.user_id,req.params.id);
        if(!isOwner) return res.sendStatus(401);
        const result = await updateServiceInfo(Number(req.params.id),req.body);
        if(result.rowCount === 0) return res.sendStatus(404);
        return res.status(201).send("Sucess");
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function changeServiceStatus(req, res) {
    try {
        const isOwner = await checkServiceOwnerShip(res.locals.user.user_id,req.params.id);
        if(!isOwner) return res.sendStatus(401);
        const result = await changeServiceAvailableStatus(Number(req.params.id),req.body.available);
        if(result.rowCount === 0) return res.sendStatus(404);
        return res.status(201).send("Sucess");
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function getServicesFromUser(req, res) {
    try {
        const userServices = await findUserServices(Number(req.params.id));
        if(!userServices) return res.sendStatus(404);
        return res.status(200).send(userServices);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function getAllServices(req, res) {
    try {
        const allServices = await findAllServices();
        if(!allServices) return res.sendStatus(404);
        return res.status(200).send(allServices);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}