export interface ILoginData {
  email: string;
  password?: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  contactNo?: string;
}

export interface IVerifyOTPData {
  email: string;
  otp: string;
}

export interface IResetPasswordData {
  email: string;
  token: string;
  newPassword?: string;
}

export interface IChangePassword {
  currentPassword?: string;
  newPassword?: string;
}
