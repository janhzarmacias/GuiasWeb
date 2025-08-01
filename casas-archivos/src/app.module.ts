// src/app.module.ts
import { Module } from '@nestjs/common';
import { CasaModule } from './casa/casa.module';
import { AuthController } from './auth/auth.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CasaModule],
  controllers: [AppController, AuthController], // <- asegúrate de tener ambos
  providers: [AppService],
})
export class AppModule {}
