import { Router } from "express";
import controllers from "./user-controller";
const router = Router();

router.get('/', controllers.getOne);
router.post('/', controllers.createOne);

export default router;