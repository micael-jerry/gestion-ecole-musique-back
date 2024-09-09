import { LoginInput } from '../../../src/auth/dto/login.input';

export const loginTestQuery = (loginInput: LoginInput) => `
	query Login {
    login(loginInput: { email: "${loginInput.email}", password: "${loginInput.password}" }) {
        token
    }
}`;
