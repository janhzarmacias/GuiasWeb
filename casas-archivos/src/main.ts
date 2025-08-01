import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const expressApp = express();

  // Crear carpeta de uploads si no existe
  if (!existsSync('./uploads')) {
    mkdirSync('./uploads');
  }

  // Crear app Nest con adaptador de Express
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  // Configuración de motor de vistas y archivos públicos
  app.setViewEngine('ejs');
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  await app.listen(3000);
}
bootstrap();
