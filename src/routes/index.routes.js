import { Router } from "express";
import homeRouter from "./home.routes.js";
import accountRouter from "./account.routes.js";
import servicesRouter from "./services.routes.js";

const router = Router();

router.use(homeRouter);
router.use(accountRouter);
router.use(servicesRouter);

export default router;