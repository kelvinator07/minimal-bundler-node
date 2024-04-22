import { Router } from 'express';
import UserController from '../controllers/user.controller';

class UserRoutes {
    router = Router();
    controller = new UserController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get('/latest', this.controller.getBlockNumber);
        this.router.post('/send-user-operation', this.controller.sendUserOperation);
    }
}

export default new UserRoutes().router;
