const express = require('express');
const router = express.Router();

let Game=[];

router.post('/create', async (req,res)=>{
    try {
        const { id,passowrd,limit } = req.body;
        const check = await Game.findIndex(data=> data.id === id );
        if (check==1) {
            res.json('Exist');
            console.log("not")
        } else {
             await Game.push({ id,passowrd,limit });
             console.log("done")
        }
    } catch (error) {
        console.error('Error in Game Creation:', error);
    }

})

module.exports=router;