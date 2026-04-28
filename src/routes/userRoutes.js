const { Router } = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

const routes = Router();

routes.post('/register', UserController.createUser);
routes.post('/login', UserController.loginUser);
routes.get('/profile', UserController.getProfile);

routes.get('/profile-private', auth, UserController.getProfile);

module.exports = routes;