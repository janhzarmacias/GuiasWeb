import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { existsSync, mkdirSync } from 'fs';
import * as session from 'express-session';
import * as FileStore from 'session-file-store';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Middleware: Sessions con archivos
  const FileStore = sessionFileStore(session);
  app.use(
    session({
      secret: 'secreto-seguro',
      resave: false,
      saveUninitialized: false,
      store: new FileStore({
        path: './sessions',
        ttl: 3600,
      }),
      cookie: {
        maxAge: 3600000,
        secure: false,
        httpOnly: true,
      },
    }),
  );

  // Crear carpeta de uploads si no existe
  if (!existsSync('./uploads')) {
    mkdirSync('./uploads');
  }

  // ✅ Configurar motor de vistas EJS
  app.setViewEngine('ejs');
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


