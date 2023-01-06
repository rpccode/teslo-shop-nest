import { Injectable, Patch } from '@nestjs/common';
import { existsSync } from 'fs';
import { BadRequestException } from '@nestjs/common/exceptions';
import { join } from 'path';

@Injectable()
export class FileService {

    getStaticProductImage( imageName: string){
        const path= join(__dirname,`../../static/products`,imageName);

        if( !existsSync(path)){
            throw new BadRequestException(`Not Product Found with imag ${imageName}`)
        }

        return path;
    }
}
