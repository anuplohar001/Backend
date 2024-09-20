import express from 'express'
const router = express.Router();
import {home} from "../controllers/auth-controllers.js" 

router.route("/feed").get(home);

export default router;