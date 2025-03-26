import { Router } from 'express';
import * as userController from '../src/controllers/v1/userController';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello, Express!');
});

router.get('/users', userController.index);
router.post('/users', userController.store);
router.get('/users/:id', userController.show);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy);

export default router;
