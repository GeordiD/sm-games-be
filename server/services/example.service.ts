import { db } from '@/db/db';
import { Example } from '@prisma/client';

export class ExamplesService {
  async all(): Promise<Example[]> {
    const result = await db.example.findMany();
    return result;
  }

  byId(id: number): Promise<Example> {
    return this.all().then((r) => r[id]);
  }

  async create(name: string): Promise<Example> {
    return await db.example.create({
      data: {
        name,
      },
    });
  }
}

export const _examplesService = new ExamplesService();
