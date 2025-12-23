
import { User, UserRole } from '../types';

class AuthService {
  private currentUser: User | null = null;

  async login(email: string, password: string): Promise<User> {
    // Simulating API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@autopawn.com') {
          this.currentUser = { id: 'u1', email, name: 'System Admin', role: UserRole.ADMIN };
          resolve(this.currentUser);
        } else if (email === 'finance@autopawn.com') {
          this.currentUser = { id: 'u2', email, name: 'Finance Manager', role: UserRole.FINANCE };
          resolve(this.currentUser);
        } else {
          this.currentUser = { id: 'u3', email, name: 'General Staff', role: UserRole.STAFF };
          resolve(this.currentUser);
        }
      }, 800);
    });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
  }

  hasPermission(role: UserRole, allowedRoles: UserRole[]): boolean {
    return allowedRoles.includes(role);
  }
}

export const authService = new AuthService();
