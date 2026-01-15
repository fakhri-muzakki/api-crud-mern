export interface ICreateUser {
  name: string;
  email: string;
  gender: 'MALE' | 'FEMALE';
}

export interface IUpdateUser {
  name?: string | null | '';
  gender?: 'MALE' | 'FEMALE';
}

export interface IUser {
  id: string;
  name: string | null;
  email: string;
  gender: 'MALE' | 'FEMALE';
}
