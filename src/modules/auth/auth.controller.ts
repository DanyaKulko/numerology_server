import { FastifyRequest } from 'fastify';
import AuthService from "./auth.service";

class AuthController {
    async login(req: FastifyRequest<{ Body: { email: string, password: string } }>) {
        const { email, password } = req.body;
        console.log('AuthController.login', email, password);
        return AuthService.login(email, password, req.server.jwt.sign);
    }

    async me(req: FastifyRequest) {
        const user = req.user as { id: number };
        return AuthService.getMe(user.id);
    }

    async createAdmin(req: FastifyRequest) {
        const { email, password, name } = req.body as { email: string; password: string; name: string };
        return AuthService.register(email, password, name);
    }
}

export default new AuthController();
