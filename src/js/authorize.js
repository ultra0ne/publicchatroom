import {auth} from "./firebase.js"
import {createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";

export function Authorize(){

//Signup
const registerUser = async(fullname,email,password)=>{

        const defaultprofileimg = "https://cdn-icons-png.flaticon.com/512/6522/6522516.png";

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // console.log(user);

            await updateProfile(user,{
                displayName:fullname,
                photoURL:defaultprofileimg

            }).then(()=>{
                

                // set name to localStorage
             setLocalName(user);

                 //Redirect to index.html
            window.location.href = "../index.html"

            });


        }catch(err){
            console.error("Error registering user :" , err);
        }

    }

    // Signin 
    const loginUser = (email,password)=>{

        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{

            // console.log(userCredential.user)

            // set name to localStorage
            setLocalName(userCredential.user);

            //Redirect to index.html
            window.location.href = "../index.html"
        })
        .catch((error)=>{
            window.alert("password is wrong")
            console.error("Error logging in :" , err);
            
        })
    }


    //Signout 

    const logoutUser = ()=>{

        signOut(auth)
        .then(()=>{
             // unset name to localStorage
             unsetLocalName();
            window.location.href="../signin.html";
        }).catch((error)=>{
            console.log("Error logging out = ",error.message);
        })

    }


    //Reset Password 

    const resetPassword = async (email,msg)=>{

       try{
        await sendPasswordResetEmail(auth, email)

        msg.textContent = "Password reset email send . Please check your inbox";
        msg.style.color = "green";
        msg.style.fontSize = "11px"
        
       }catch{
        console.error("Error logging out = ",error.message)

        msg.textContent = "Error :  ${error.message}";
        msg.style.color = "red";
        msg.style.fontSize = "11px"

       }

    }


    //Google Signin

    const googleLogin = ()=>{

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {
            
            // console.log(result);

             // set name to localStorage
             setLocalName(result.user.displayName);

             //Redirect to index.html
            window.location.href = "../index.html"

        }).catch((error) => {
            console.log("Error logging out = ",error.message);
       
  });

    }



    //Auth Check

    const isLooggedIn = ()=>{

        onAuthStateChanged(auth,(userdata)=>{
            if (userdata){
                return true;
            }else{
                //Redirect to sign.html
                window.location.href = "../signin.html"
            }
        })
        
    }



    //Get User Info

    const getUser = (callback)=>{
        // callback ("hello sir");
        onAuthStateChanged(auth,(userdata)=>{
            if(userdata){
                callback(userdata);
            }
        });
        
    }

    const setLocalName = (userdata)=>{
        localStorage.setItem('username',userdata.displayName);
    }

    const unsetLocalName = ()=>{
        localStorage.removeItem('username');
    }



    return {registerUser,loginUser,logoutUser,resetPassword,googleLogin,isLooggedIn,getUser};
}