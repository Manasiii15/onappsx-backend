import express from "express";
import appscontroller from '../controllers/apps-controller.js'
import userverify from "../middlewares/userverify.js";
import likeController from "../controllers/like-controller.js";
import { addComment } from "../controllers/comment-controller.js";
import { getComments } from "../controllers/comment-controller.js";
import { updateComment } from "../controllers/comment-controller.js";
import { deleteComment } from "../controllers/comment-controller.js";

const router = express.Router()

router.get("/",appscontroller.appApps)
router.get("/search",appscontroller.searchapp)
router.get("/details/:id",appscontroller.appAppsId)

router.post('/details/:id/like', userverify,likeController.addLike);
router.delete('/details/:id/unlike', userverify,likeController.removeLike);
router.get('/details/:id/likes', userverify,likeController.getLikes);

router.post('/details/:id/addcomm', userverify,addComment);
router.get('/details/:id/getcomm', getComments);
router.patch('/details/:id/:cid/updtcomm',userverify, updateComment);
router.delete('/details/:id/:cid/rmcomm',userverify, deleteComment);

export default router