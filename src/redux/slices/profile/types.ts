export type ProfileType = {
  userId?: number;
  fullName: string;
  birthday: Date | number;
  city: string;
  about: string;
  hobbies: string;
  photos?: ProfilePhotosType;
};

export type ProfilePhotosType = {
  small: string | null;
  large: string | null | undefined;
};

export type UpdateProfileType = {
  fullName: string;
  birthday: Date | number;
  city: string;
  about: string;
  hobbies: string;
};
