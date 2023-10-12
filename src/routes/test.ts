import { Router } from 'express';
import { getTest } from '../controllers/test';

export const routes = Router();

routes.get('/', getTest);
