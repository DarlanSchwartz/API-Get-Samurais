import { v4 as uuid } from 'uuid';
import {userExists ,getInfoFromUser, createUserSession, userCanLogin, createUser}from '../repository/account.repository.js';


export async function signUp(req, res) {

    const { name, email, password, confirmPassword,cellphone,city } = req.body;

    try {
        if (password !== confirmPassword) return res.status(422).send("Passwords need to be the same!");
        const alreadyHasUser = await userExists(email);
        if (alreadyHasUser) return res.status(409).send("There is already account using this email!");
        await createUser(name,email,password,cellphone,city);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function signIn(req, res) {
    const { email ,password } = req.body;
    try {
        const userCanLogIn = await userCanLogin(email,password);

        if (!userCanLogIn) return res.status(401).send("No samurai found with this email");
        
        const token = uuid();

        await createUserSession(email,token);

        return res.status(200).send({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}

export async function getUserInfo(req, res) {
    try {
        const user = await getInfoFromUser(res.locals.user.email);
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
}
