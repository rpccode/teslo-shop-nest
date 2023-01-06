import { Request } from "express";
import { Multer } from "multer";

export const fileFilter = ( req: Request , file: Express.Multer.File, callback: Function) =>{
    if (!file) return callback( new Error('File is Emty'), false);
    
    const fileExtension =  file.mimetype.split('/')[1]
    const validExtencion = ['jpg','png','svg','gif','jpeg','svg+xml'];
    if(validExtencion.includes(  fileExtension )){
        return callback( null, true )
    }

    callback(null, false)
}