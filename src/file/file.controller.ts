import { Controller, Post, Get } from '@nestjs/common';
import { FileService } from './file.service';
import { Param, Res, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helpers';
import { BadRequestException } from '@nestjs/common/exceptions';
import { diskStorage } from 'multer';
import { fileName } from './helpers/fileName.helpers';
import { ConfigService } from '@nestjs/config';
import {  Response } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService,
      private readonly confiService:  ConfigService
    ) {}
    @Get('product/:imageName')
    findProductImage(
      @Res() res: Response,
      @Param('imageName') imageName: string
    ){
      const patch = this.fileService.getStaticProductImage( imageName );

      res.sendFile( patch );
    }


  @Post('products')
  @UseInterceptors( FileInterceptor('file',{
    fileFilter: fileFilter,
    storage: diskStorage({
      destination:'./static/products',
      filename: fileName
    })
  }))
  uploadFileImageFileSystem( @UploadedFile() file: Express.Multer.File){


      if( !file ){
        throw new BadRequestException('no se a proporcionado una imagen')
      }

      const secureUrl = `${this.confiService.get('HOST_API')}/file/product/${ file.filename}`

    return {
      secureUrl
    }
  }
}
