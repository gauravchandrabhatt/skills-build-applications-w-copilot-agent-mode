import { Router } from 'express';
import type { Model } from 'mongoose';

export function createCrudRouter(model: Model<any>) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }));
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (request, response, next) => {
    try {
      const document = await model.findById(request.params.id);
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(document);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      response.status(201).json(await model.create(request.body));
    } catch (error) {
      next(error);
    }
  });

  router.patch('/:id', async (request, response, next) => {
    try {
      const document = await model.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
      });
      if (!document) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(document);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (request, response, next) => {
    try {
      const result = await model.findByIdAndDelete(request.params.id);
      if (!result) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}