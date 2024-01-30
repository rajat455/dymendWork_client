import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiHelper from '../../Commen/ApiHelper';
import UserValidator from './UserValidator';
import { MenuItem, Select } from '@mui/material';
import { role } from '../../Commen/Constents';


export default function MangeUser(props) {
    const { open, setOpen,GetUsers, userDetails, setuserDetails } = props
    const [SelectedRole, setSelectedRole] = React.useState(role.admin);

    const handleClose = () => {
        setOpen(false);
    };

    const InsertHandeler = async () => {
        try {
            const getValidation = UserValidator({ ...userDetails })
            if (getValidation) return window.showSnack(getValidation, { variant: "error" })
            const data = { ...userDetails, role:SelectedRole }
            await apiHelper.createUser(data)
            GetUsers()
            setOpen(false)
            window.showSnack("Success", {variant:"success"})
        } catch (error) {
            window.showSnack(error.message, {variant:"error"})
        }
    }



    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Create User</DialogTitle>
                <hr className='m-0' />
                <DialogContent>
                    <label htmlFor="firstName">Firstname</label>
                    <TextField
                        autoFocus
                        onChange={(e) => setuserDetails({ ...userDetails, firstName: e.target.value })}
                        required
                        margin="dense"
                        id="firstName"
                        type="text"
                        fullWidth
                        size='small'
                        variant="outlined"
                    />
                    <label htmlFor="lastName">Lastname</label>
                    <TextField
                        onChange={(e) => setuserDetails({ ...userDetails, lastName: e.target.value })}
                        required
                        margin="dense"
                        id="lastName"
                        type="text"
                        fullWidth
                        size='small'
                        variant="outlined"
                    />
                    <label htmlFor="phone">Phone</label>
                    <TextField
                        onChange={(e) => setuserDetails({ ...userDetails, phone: e.target.value })}
                        required
                        margin="dense"
                        id="phone"
                        type="text"
                        fullWidth
                        size='small'
                        variant="outlined"
                    />
                    <label htmlFor="role">Select Role</label>
                       <Select className='mt-2 mb-1' fullWidth id='role' size='small' value={SelectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <MenuItem value={role.admin}>
                            <i>Admin</i>
                        </MenuItem>
                        <MenuItem value={role.manager}>
                            <i>Manager</i>
                        </MenuItem>
                        <MenuItem value={role.employee}>
                            <i>Employee</i>
                        </MenuItem>

                    </Select>
                    <label htmlFor="password">Password</label>
                    <TextField
                        onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })}
                        required
                        margin="dense"
                        id="password"
                        type="password"
                        fullWidth
                        size='small'
                        variant="outlined"
                    />
                 
                </DialogContent>
                <DialogActions>
                    <Button color={"error"} onClick={handleClose}>Cancel</Button>
                    <Button onClick={InsertHandeler}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
