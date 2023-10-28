const router = require("express").Router();
const categoryController=require("../controller/category")

router.post("/",categoryController.addCategory)



module.exports=router