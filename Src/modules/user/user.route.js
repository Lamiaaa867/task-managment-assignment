import { Router } from "express";
import * as userController from './user.controller.js'
import { isAuthentcated } from "../../middleWares/authentication.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { validationCore } from "../../middleWares/validationcore.js";
import { signUpSchema } from "./uservalidationSchema.js";
import { logInValidationSchema } from "./uservalidationSchema.js";
const router= Router();
router.post('/signup',validationCore(signUpSchema), asyncHandler (userController.signUp));
router.post('/login',validationCore(logInValidationSchema),asyncHandler(userController.login));
router.post('/logout',isAuthentcated(),asyncHandler(userController.logOut));



export default router;