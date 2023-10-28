const router = require("express").Router();
const authorController=require("../controller/author")

router.post("/",authorController.addAnAuthor)



module.exports=router