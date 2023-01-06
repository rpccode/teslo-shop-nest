import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST ,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ,
    autoLoadEntities:true,
    synchronize: true,
  }),

  
    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    }),
  ProductsModule,
  CommonModule,
  SeedModule,
  FileModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
