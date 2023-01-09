import { Router } from "express";


const router = Router();

router.get("/",(req,res)=>{
    res.render("chat",{
        title:"chat"
    })
})


// views router of handlebars



export default router