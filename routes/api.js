import { Router } from 'express';

// Controllers
import * as userController from '../src/controllers/v1/userController';

// From Requests
import userRequestValidation from '../src/formRequests/v1/user/userRequestValidation';
import userUpdateRequestValidation from '../src/formRequests/v1/user/userUpdateRequestValidation';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello, Express!');
});

router.get('/users', userController.index);
router.post('/users', userRequestValidation(), userController.store);
router.get('/users/:id', userController.show);
router.put('/users/:id', userUpdateRequestValidation(), userController.update);
router.delete('/users/:id', userController.destroy);

export default router;
