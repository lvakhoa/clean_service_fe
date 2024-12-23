type Claim = {
  type: string;
  value: string;
};

type DecodedToken = {
  claims: Claim[];
};

type Profile = {
  id: string;
  userType?: RoleType;
  gender: string
  profilePicture?: string;
  identityCard?: string;
  fullName: string
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

type RoleType = 'Admin' | 'Customer' | 'Helper';
