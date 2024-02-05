import { _examplesService } from '@/services/example.service';
import { Request, Response } from 'express';

export class ExamplesController {
  all(_: Request, res: Response): void {
    _examplesService.all().then((r) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id']);
    _examplesService.byId(id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  async create(_req: Request, res: Response) {
    const result = await _examplesService.create(_req.body.name);
    res.json(result);
  }
}

export const _examplesController = new ExamplesController();
