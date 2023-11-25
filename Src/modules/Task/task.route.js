import { Router } from "express";
import * as taskcontroller from './task.controller.js'
import { asyncHandler } from "../../utils/errorHandling.js";
import { isAuthentcated } from "../../middleWares/authentication.js";
const router=Router();

router.post('/addtask',isAuthentcated(),asyncHandler(taskcontroller.addTask))
router.get('/getall',isAuthentcated(),asyncHandler(taskcontroller.getallTask))
router.get('/select',isAuthentcated(),asyncHandler(taskcontroller.getSelectedTask))
router.patch('/update',isAuthentcated(),asyncHandler(taskcontroller.updateTask))
router.delete('/del',isAuthentcated(),asyncHandler(taskcontroller.deleteTask))
router.get('/dead',asyncHandler(taskcontroller.deadlineTask))
export default router
