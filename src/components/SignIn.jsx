
import {  GoogleAuthProvider, signInWithCredential } from 'firebase/auth'; // Ensure signInWithCredential is imported
import { useEffect, useRef } from 'react'; // Assuming React for the component structure
import { auth } from '../firebaseApp';
const myClientId=import.meta.env.VITE_MY_WEB_CLIENT_ID

export const SignIn = () => {
    const googleButtonRef = useRef(null); // Ref for the Google button div

    useEffect(() => {
        // Initialize Google Identity Services
        if (googleButtonRef.current) {
            window.google.accounts.id.initialize({
                client_id: myClientId, // Replace with your Web Client ID from Firebase project settings -> Authentication -> Sign-in method -> Google
                callback: handleGoogleCredentialResponse, // Our callback function
                ux_mode: "popup" // Or "redirect" if you prefer
            });

            // Render the Google Sign-In button
            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                { theme: "outline", size: "large", text: "signin_with", shape: "rectangular" } // Customize button appearance
            );
        }
    }, []);

    const handleGoogleCredentialResponse = async (response) => {
        // This is called when the user successfully signs in with Google
        const idToken = response.credential; // The ID token from Google

        // Create a Firebase credential from the Google ID token
        const googleCredential = GoogleAuthProvider.credential(idToken);

        try {
            // Sign in to Firebase with the credential
            console.log("auth config:", auth.app.options);

            await signInWithCredential(auth, googleCredential);
            console.log("Successfully signed in with Firebase using Google credential!");
            // Handle successful sign-in (e.g., redirect user)
        } catch (error) {
            console.error("Error signing in with Firebase using Google credential", error);
            // Handle error
        }
    };

  return (
    <div className='signin'>
        <p>Jelentkezz be hogy chatalhess!</p>
        {/* The Google button will render inside this div */}
        <div ref={googleButtonRef}></div>
    </div>
  )
}



