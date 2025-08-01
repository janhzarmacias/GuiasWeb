import { Injectable, NotFoundException } from '@nestjs/common';
import { Casa } from './entities/casa.entity';

@Injectable()
export class CasaService {
  private casas: Casa[] = [
    { id: 1, nombre: 'Casa 1' },
    { id: 2, nombre: 'Casa 2' },
  ];

  findOne(id: number): Casa {
    const casa = this.casas.find((c) => c.id === id);
    if (!casa) throw new NotFoundException('Casa no encontrada');
    return casa;
  }

  saveFileInfo(id: number, data: Partial<Casa>) {
    const casa = this.findOne(id);
    Object.assign(casa, data);
    return casa;
  }

  getAll() {
    return this.casas;
  }
}
