type Claim = {
  type: string;
  value: string;
}

type DecodedToken = {
  claims: Claim[];
}