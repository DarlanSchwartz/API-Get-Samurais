import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js"; // ---> validateAuth can be used to check if header Authorization is valid and or for example, lives in the database?!
import { LoginSchema, UserSchema } from "../schemas/account.schemas.js"; // ---> NewItemSchema can be used as a middleware to validate an item structure
import { getUserInfo, signIn, signUp } from "../controllers/account.controller.js";
import validateSchema from "../middlewares/validateSchema.js";

const accountRouter = Router();

accountRouter.post('/signup',validateSchema(UserSchema), signUp); 
accountRouter.post('/signin',validateSchema(LoginSchema), signIn); 
accountRouter.get('/users/me',validateAuth, getUserInfo); 

export default accountRouter;