// app/firebase/auth.ts
import { getAuth } from 'firebase/auth';
import app from './firebaseConfig';

const auth = getAuth(app);
export default auth;
