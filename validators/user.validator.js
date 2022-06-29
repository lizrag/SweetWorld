import { check } from "express-validator";
import validateResult from "./validator.helper.js";

const validateCreate = [
    check('name')
    .exists()
    .not()
    .isEmpty(),
    check('email')
    .exists()
    .isEmail(),
    check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be 8 characters'),
    (req,res,next) =>{
        validateResult(req,res,next)
    }


]

export default validateCreate;