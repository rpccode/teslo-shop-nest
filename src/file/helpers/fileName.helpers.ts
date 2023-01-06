import { Request } from "express";
import { Multer } from "multer";
import { v4 as uuid} from 'uuid'
export const fileName = ( req: Request , file: Express.Multer.File, callback: Function) =>{
    if (!file) return callback( new Error('File is Emty'), false);
    const fileExtencion = file.originalname.split('.')[1];
    const fileName = `${ uuid() }.${ fileExtencion } `;

    callback(null, fileName)
}