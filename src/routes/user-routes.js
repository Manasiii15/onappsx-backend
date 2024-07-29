import express from "express";
import userController from "../controllers/user-controller.js";
import hashPassword from "../middlewares/bcriptjs-hashpasword.js";
import verifyuser from '../middlewares/userverify.js'
import appscontroller from '../controllers/apps-controller.js'

const router = express.Router()

router.post("/signup",hashPassword,userController.handleUserSignUp)
router.post("/login",userController.handleUserlogin)
router.get("/profile",verifyuser,userController.userProfile)
router.post("/createapp",verifyuser,appscontroller.createApps)
router.get("/userapp",verifyuser,appscontroller.userApps)
router.delete("/userapp",verifyuser,appscontroller.appDelete)
router.get("/",userController.homePage)

export default router