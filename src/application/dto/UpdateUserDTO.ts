export class UpdateUserDTO {
  name?: string;
  role?: 'admin' | 'user';
  permissions?: string[];
  avatar?: string;

  constructor(data: {
    name?: string;
    role?: 'admin' | 'user';
    permissions?: string[];
    avatar?: string;
  }) {
    this.name = data.name;
    this.role = data.role;
    this.permissions = data.permissions;
    this.avatar = data.avatar;
  }
}