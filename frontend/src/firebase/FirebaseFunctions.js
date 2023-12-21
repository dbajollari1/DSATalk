import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import axios from 'axios';

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
  await saveUserToBackend(auth.currentUser.accessToken, email, displayName);
  await updateProfile(auth.currentUser, {displayName: displayName});
}

async function doChangePassword(email, oldPassword, newPassword) {
  const auth = getAuth();
  let credential = EmailAuthProvider.credential(email, oldPassword);
  console.log(credential);
  await reauthenticateWithCredential(auth.currentUser, credential);

  await updatePassword(auth.currentUser, newPassword);
  //await doSignOut();
}

async function doSignInWithEmailAndPassword(email, password) {
  let auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
}

async function doSocialSignIn() {
  const auth = getAuth();
  const socialProvider = new GoogleAuthProvider();
  socialProvider.setCustomParameters({ prompt: 'select_account' });
  return await signInWithPopup(auth, socialProvider);
}

async function doPasswordReset(email) {
  let auth = getAuth();
  await sendPasswordResetEmail(auth, email);
}

async function doSignOut(navigate) {
  try{
    let auth = getAuth();
    
    await auth.signOut();
    navigate('/'); // Redirect to the home page

    window.location.reload();

  }catch(error){
    console.error('Error during sign-out:', error);
  }
}
 const saveUserToBackend = async (accessToken,email,displayName) => {
    
    try {


      const headers = {
        'Authorization': `Bearer ${accessToken}`, 
        'Content-Type': 'application/json',
      };
      
      const response = await axios.post('http://localhost:3000/users/addUser', {
        email: email,
        username: displayName
        // Add other user data as needed
      }, {headers});

      } catch (error) {
      // Handle errors
      alert('Error saving user to backend:' + error.message);
    }
  };
export {
  doCreateUserWithEmailAndPassword,
  doSocialSignIn,
  doSignInWithEmailAndPassword,
  doPasswordReset,
  doSignOut,
  doChangePassword
};
