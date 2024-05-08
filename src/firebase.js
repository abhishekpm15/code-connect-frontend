import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAeGkUzOMSYOA6zX92jdhuYIfLfRjmSQvQ",
  authDomain: "code-connect-f93fa.firebaseapp.com",
  projectId: "code-connect-f93fa",
  storageBucket: "code-connect-f93fa.appspot.com",
  messagingSenderId: "895507770888",
  appId: "1:895507770888:web:da8df38b7ea9fe81f36bbd"
};

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app)