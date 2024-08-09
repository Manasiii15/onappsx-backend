import express from "express";
import appscontroller from '../controllers/apps-controller.js'
import userverify from "../middlewares/userverify.js";
import likeController from "../controllers/like-controller.js";

const router = express.Router()

router.get("/",appscontroller.appApps)
router.get("/search",appscontroller.searchapp)
router.get("/details/:id",appscontroller.appAppsId)

router.post('/details/:id/like', userverify,likeController.addLike);
router.delete('/details/:id/unlike', userverify,likeController.removeLike);
router.get('/details/:id/likes', userverify,likeController.getLikes);

export default router