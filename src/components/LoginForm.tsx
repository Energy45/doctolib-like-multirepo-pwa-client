import { Button, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../main";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = useCallback(async () => {
        const user = await signInWithEmailAndPassword(auth, email, password);
        if(user) {
            // console.log(user);
            console.log(auth.currentUser);
            navigate('/');
        }
    }, [email, password]);

    const handleChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }, [email]);

    const handleChangePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }, [password]);

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
                    <Button onClick={handleLogin}>Login</Button>
                </Grid>
            </Grid>
            {/* <input type="email" value={email} onChange={handleChangeEmail}></input>
            <input type="password" value={password} onChange={handleChangePassword}></input>
            <input type="text" value={idPractitioner} onChange={handleChangePractitioner}></input>
            <button onClick={handleRegister}></button> */}
        </div>
    )
}