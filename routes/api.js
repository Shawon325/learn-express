import { Router } from 'express';

// Controllers
import * as userController from '../src/controllers/v1/userController';
import * as authController from '../src/controllers/v1/authController';
// From Requests
import userRequestValidation from '../src/formRequests/v1/user/userRequestValidation';
import userUpdateRequestValidation from '../src/formRequests/v1/user/userUpdateRequestValidation';
import registerRequestValidation from '../src/formRequests/v1/auth/registerRequestValidation';
import loginRequestValidation from '../src/formRequests/v1/auth/loginRequestValidation';

const router = Router();

router.get('/', (_, res) => {
  res.send('Hello, Express!');
});

router.post('/login', loginRequestValidation(), authController.login);
router.post('/register', registerRequestValidation(), authController.register);

router.get('/users', userController.index);
router.post('/users', userRequestValidation(), userController.store);
router.get('/users/:id', userController.show);
router.put('/users/:id', userUpdateRequestValidation(), userController.update);
router.delete('/users/:id', userController.destroy);

export default router;
