import { useState } from "react";
import { signInWithGooglePopup, signInUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";

import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import "./sign-in.styles.scss"
const signInDefaultFields = {
    email: "",
    password: ""
}
const SignIn = () => {
    const [signInFields, setSignInFields] = useState(signInDefaultFields)
    const {email, password} = signInFields;


    const resetFormFields = () => {
        setSignInFields(signInDefaultFields);
    }

    const logGoogleUser = async () => {
         await signInWithGooglePopup();
    }

    const logInUser = async (event) => {
        event.preventDefault()
        try {
         await signInUserWithEmailAndPassword(email, password);
        resetFormFields();
        } catch (error) {

            switch(error.code){
                case "auth/wrong-password":
                    alert("incorrect password for email")
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email");
                    break;
                default: 
                    console.log(error)
            }

            // if(error.code === "auth/wrong-password") {
            //     alert("Incorrect password for email")
            // }
        }
        
    }

    const handleChange = (event) => {
        const {value, name} = event.target;
        setSignInFields({...signInFields, [name]: value})
        
    }

    

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={logInUser}>
            <FormInput label={"Email"} onChange={handleChange} name="email" type={"email"} required value={email}/>
            <FormInput label={"Password"} onChange={handleChange} name="password" type={"password"} required value={password}/>
            <div className="buttons-container">
                <Button tye="submit">SIGN IN</Button>
                <Button type="button" buttonType="google" onClick={logGoogleUser}>Sign in with Google</Button>
            </div>
            </form>
        </div>
    )
}

export default SignIn;