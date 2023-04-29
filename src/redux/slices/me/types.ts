export type LoginType = {
  email: string;
  password: string;
};

export type RegistrationData = {
  email: string;
  fullName: string;
  password: string;
};

export type MeData = {
  _id: string;
  email: string;
  fullName: string;
  password: string;
  confirmed: boolean;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
};
