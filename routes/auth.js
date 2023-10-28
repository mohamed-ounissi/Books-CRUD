const router = require("express").Router();
const userController=require("../controller/auth")

router.post("/signup",userController.Signup)
router.post("/login",userController.Login)


module.exports=router