import UserAffiliation from './user-affiliation';

type User = {
  name: string;
  email: string;
  image: string;
  affiliations: UserAffiliation[];
};

export default User;
