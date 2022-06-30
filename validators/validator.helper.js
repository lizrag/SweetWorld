import { validationResult } from "express-validator";

const validateResult = (req,res,next) =>{
    try{
        validationResult(req).throw()
        return next()
    }catch(error){
        return res.json({ success: false, message: error.mapped() });
    }
    
};

export default validateResult;