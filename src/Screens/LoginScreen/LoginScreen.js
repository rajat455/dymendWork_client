import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import apiHelper from "../../Commen/ApiHelper";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../Redux/Auth/AuthActions";
import { useNavigate } from "react-router-dom";

export default function LoginScreen({setpermission, permission}) {
    const [Phone, setPhone] = useState("");
    const [Password, setPassword] = useState('');
    const Auth = useSelector(state => state.Auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
       if(Auth && permission) navigate(permission.dashBoard || Object.values(permission)[0] )
    }, [Auth,permission,navigate]);

    



    const LoginHandeler = async () => {
        try {
            const data = {
                password: Password,
                phone: Phone
            }
            if (!data.phone || data.phone.length < 10) return window.showSnack("Please Enter A valid Phone Number", { variant: 'error' })
            if (!data.password) return window.showSnack("Please Enter A valid Password", { variant: 'error' })
            const result = await apiHelper.loginUser(data)
            dispatch(LoginAction(result.data.token))
            setpermission(JSON.parse(localStorage.getItem("permission")))
        } catch (error) {
            window.showSnack(error.message, { variant: "error" })
        }
    }
    return <>
        <Dialog
            open={true}
            className="mx-auto"
            sx={{ width: "350px" }}
        >
            <DialogTitle>Login your Account.</DialogTitle>
            <hr className='m-0' />
            <DialogContent>
                <label htmlFor="phone">Phone Number</label>
                <TextField
                    onChange={(e) => {
                        if (!Number(e.target.value)) {
                            e.target.value = ""
                        }
                        if (e.target.value.length > 10) {
                            e.target.value = e.target.value.substring(0, e.target.value.length - 1)
                            return
                        }
                        setPhone(e.target.value)
                    }}
                    autoFocus
                    required
                    margin="dense"
                    id="phone"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
                <label htmlFor="password">Password</label>
                <TextField
                    autoFocus
                    required
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    margin="dense"
                    id="password"
                    type="password"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions className="pt-0 pb-3">
                <center className="w-100">
                    <Button onClick={LoginHandeler} size="small" variant="contained">Login</Button>
                </center>
            </DialogActions>
        </Dialog>

    </>
}