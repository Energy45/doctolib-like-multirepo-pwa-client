import { Button, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "@firebase/auth";
import { auth, db, firebaseConfig } from "../main";
import { addDoc, collection } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    console.log(firebaseConfig)
    const handleRegister = useCallback(async () => {
        const emailList: string[] = await fetchSignInMethodsForEmail(auth, email);
        if(emailList.length > 0) {
            //Display email exists
        } else {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            const userCreated = await addDoc(collection(db, 'users_clients'), {
                uid: user.user.uid,
                email: user.user.email,
            });
            if(userCreated) {
                navigate('/login');
            }
        }
    }, [email, password])

    const handleChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }, [email])

    const handleChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }, [password])

    return (
        <div>
            <Grid container>
                <Grid xs={12}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                </Grid>
                <Grid xs={12}>
                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handleChangePassword}
                    />
                </Grid>
                <Grid xs={12}>
                    <Button onClick={handleRegister}>Register</Button>
                </Grid>
            </Grid>
            {/* <input type="email" value={email} onChange={handleChangeEmail}></input>
            <input type="password" value={password} onChange={handleChangePassword}></input>
            <input type="text" value={idPractitioner} onChange={handleChangePractitioner}></input>
            <button onClick={handleRegister}></button> */}
        </div>
    )
}