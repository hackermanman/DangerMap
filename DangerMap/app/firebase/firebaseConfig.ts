// app/firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX",
};

const app = initializeApp(firebaseConfig);

export default app;
