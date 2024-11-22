import IProfile from './user.interface';

interface UserState {
   jwt: string | null;
   loginErrorMessage?: string;
   profile?: IProfile;
}

export default UserState;
