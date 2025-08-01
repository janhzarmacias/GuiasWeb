// src/casa/casa.controller.ts
import {
  Controller,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
  BadRequestException,

} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CasaService } from './casa.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { existsSync, mkdirSync } from 'fs';

@Controller('casa')
export class CasaController {
  constructor(private readonly casaService: CasaService) {}

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('archivo', { dest: './uploads' }))
  uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('Archivo demasiado grande');
    }

    this.casaService.saveFileInfo(+id, {
      fileContentType: file.mimetype,
      filename: file.originalname,
      fileID: file.filename,
    });

    return { mensaje: 'Archivo subido', file };
  }

@Get('download/:id')
downloadFile(@Param('id') id: string, @Res() res: Response) {
  const casa = this.casaService.findOne(+id);

  if (!casa.fileID || !casa.filename || !casa.fileContentType) {
    throw new BadRequestException('Archivo no disponible para esta casa');
  }

  const filePath = join(process.cwd(), 'uploads', casa.fileID);

  if (!casa.fileID || !casa.filename || !casa.fileContentType) {
  throw new BadRequestException('La casa no tiene archivo asociado');
}

const path = join(process.cwd(), 'uploads', casa.fileID);
res.contentType(casa.fileContentType);
res.setHeader('Content-Disposition', `attachment; filename="${casa.filename}"`);

const fileStream = createReadStream(path);
fileStream.pipe(res);
}

}
