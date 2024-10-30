import { Company } from "../../../core/entities/company.entity";
import { UserLogin } from "../../../core/use-cases/users/login-user.use-case";

export abstract class HttpAdapter {
  abstract get<T>(url: string, options?: Record<string, unknown>): Promise<T>;
  abstract delete<T>(url: string, options?: Record<string, unknown>): Promise<T>;
  abstract post<T>(url: string, data: Company, options?: Record<string, unknown>): Promise<T>;
  abstract postLogin<T>(url: string, data: UserLogin, options?: Record<string, unknown>): Promise<T>;
}
