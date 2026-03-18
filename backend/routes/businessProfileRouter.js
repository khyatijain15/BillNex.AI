import express from 'express';
import { clerkMiddleware } from '@clerk/express';
import {createBusinessProfile, getMyBusinessProfile, updateBusinessProfile} from '../controllers/businessProfileController.js'
import { upload } from '../config/cloudinary.js';

const businessProfileRouter=express.Router();

businessProfileRouter.use(clerkMiddleware());

//create
businessProfileRouter.post(
    "/",upload.fields([
        {name:"logoName",maxCount:1},
        {name:"stampName",maxCount:1},
        {name:"signatureNameMeta",maxCount:1}
    ]),
    createBusinessProfile
)

//to update
businessProfileRouter.put(
    "/:id",
    upload.fields([
        {name : "logoName",maxCount:1},
        {name : "stampName",maxCount:1},
        {name : "signatureNameMeta",maxCount:1},
    ]),
    updateBusinessProfile
);

businessProfileRouter.get("/me",getMyBusinessProfile);

export default businessProfileRouter;