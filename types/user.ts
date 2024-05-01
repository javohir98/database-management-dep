export interface IUser {
  id: string;
  commentId: number;
  createdAt: Date | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  avatar: string;
  isStaff: boolean;
  staffId?: number;
}

export interface IUserForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  isStaff: boolean;
  staffId?: number;
}

export type TOrderBy = '' | 'createdAt' | 'firstName' | 'lastName' | 'country';
