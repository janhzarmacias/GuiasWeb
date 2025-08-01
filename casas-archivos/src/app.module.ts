import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CasaModule } from './casa/casa.module';

@Module({
  imports: [CasaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
