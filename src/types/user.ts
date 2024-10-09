export interface UserInfoType {
  token: string;
  userId: string;
}

export interface ProfileType {
  username: string;
  firstName: string;
  lastName: string;
  sex: string;
  avatar: string;
  dateOfBirth: string;
  address: string;
  bio: string;
  contactsResponseDTOSet: Array<{
    contactType: string;
    contactValue: string;
    isPrimary: boolean;
  }>;
}
