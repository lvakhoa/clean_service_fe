type Claim = {
  type: string;
  value: string;
};

type DecodedToken = {
  claims: Claim[];
};

type RoleType = 'Admin' | 'Customer' | 'Helper';
