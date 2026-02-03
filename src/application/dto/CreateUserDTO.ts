export class CreateUserDTO {
  email: string;
  name: string;
  role: 'admin' | 'user';
  permissions: string[];
  avatar?: string;

  constructor(data: {
    email: string;
    name: string;
    role: 'admin' | 'user';
    permissions: string[];
    avatar?: string;
  }) {
    this.email = data.email;
    this.name = data.name;
    this.role = data.role;
    this.permissions = data.permissions;
    this.avatar = data.avatar;
  }
}