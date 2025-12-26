import { prisma } from "../../db";
import bcrypt from 'bcryptjs';
import HttpError from "../../errors/HttpError";

class AuthService {
    async login(email: string, pass: string, jwtSign: any) {
        const user = await prisma.adminUser.findUnique({ where: { email } });

        if (!user) throw new HttpError(401, 'Invalid credentials');

        const isValid = await bcrypt.compare(pass, user.password);
        if (!isValid) throw new HttpError(401, 'Invalid credentials');

        const token = jwtSign({ id: user.id, email: user.email });

        return { token, user: { id: user.id, email: user.email, name: user.name } };
    }

    async getMe(userId: number) {
        const user = await prisma.adminUser.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true }
        });
        if (!user) throw new HttpError(401, 'User not found');
        return user;
    }

    // Временный метод для создания админа (можно удалить после использования)
    async register(email: string, pass: string, name: string) {
        const hashedPassword = await bcrypt.hash(pass, 10);
        return prisma.adminUser.create({
            data: { email, password: hashedPassword, name }
        });
    }
}

export default new AuthService();
