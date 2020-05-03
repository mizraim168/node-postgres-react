// Imports
const express = require('express');
const router = express.Router();
const userController = require('../controllers/Users.controller');

    //Routes users
    router.get('/', userController.getUsers);
    router.get('/:id', userController.getUser);
    router.post('/', userController.postUser);
    router.put('/:id', userController.putUser);
    router.delete('/:id', userController.deleteUser);



// Export routes
module.exports = router;
