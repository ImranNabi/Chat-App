import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,signOut} from "firebase/auth";
import { toast } from "react-toastify";
import {doc,getFirestore,setDoc} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBTYudwxK1B2_hmPAk6ybzNdP7XyE4WSJQ",
  authDomain: "chat-app-gs-2ce42.firebaseapp.com",
  projectId: "chat-app-gs-2ce42",
  storageBucket: "chat-app-gs-2ce42.appspot.com",
  messagingSenderId: "759412844038",
  appId: "1:759412844038:web:87993b03f28953613c0587"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
  

const signup=async(username,email,password)=>{
try{
const res=await createUserWithEmailAndPassword(auth,email,password);
const user =res.user;
await setDoc(doc(db,"users",user.uid),{
    id:user.uid,
    username:username.toLowerCase(),
    email,
    name:"",
    avatar:"",
    bio:"Hey,There i am using chat app",
    lastSeen:Date.now()
})
await setDoc(doc(db,"chats",user.uid),{
    chatData:[]
})
}catch(error){
   console.error(error)
   toast.error(error.code.split('/')[1].split('-').join(" "));}
}
const login=async(email,password)=>{
  try{
     await signInWithEmailAndPassword(auth,email,password)
  }catch(error){
   console.error(error);
   toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}
const logout=async ()=>{
  try{ 
    await signOut(auth)
  }
  catch(error){
    console.error(error);
   toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}
export {signup,login,logout,auth,db}
