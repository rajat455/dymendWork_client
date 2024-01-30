import { useEffect, useState } from "react"
import apiHelper from "../../Commen/ApiHelper"
import { role } from "../../Commen/Constents"
import { DataGrid } from "@mui/x-data-grid"
import { Button, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import MangeUser from "./MangeUser"

export default function UserScreen() {

    const [users, setusers] = useState([])
    const [open, setopen] = useState(false);
    const inituserDetails = {
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
    }
    const [userDetails, setuserDetails] = useState(inituserDetails);

    async function GetUsers() {
        try {
            const result = await apiHelper.getUsers(role.all)
            setusers(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetUsers()
    }, [])
    
    
    async function DeleteHandeler(id){
        try {
            if(!window.confirm("Are you sure to Remove this user?")) return
            await apiHelper.deleteUser(id)
            GetUsers()
            window.showSnack("Success", {variant:"success"})
        } catch (error) {
            window.showSnack(error.message, {variant:"error"})
        }
    }

  

    const columns = [
        { field: "_id", width: 200, headerName: "ID" },
        { field: "firstName", width: 150, headerName: "Firstname" },
        { field: "lastName", width: 150, headerName: "Lastname" },
        { field: "role", width: 150, headerName: "Role" },
        { field: "phone", width: 150, headerName: "Phone" },
        {
            field: "actions", flex: 1, headerName: "Actions", renderCell: (cell) => {
                return <IconButton color="error" onClick={() => DeleteHandeler(cell.row._id)}>
                    <Delete />
                </IconButton>
            }
        },
    ]

    return <>
        <MangeUser GetUsers={GetUsers} userDetails={userDetails} setuserDetails={setuserDetails} open={open} setOpen={setopen} />
        <div className="d-flex justify-content-between align-items-center">
            <h3>Manage Users.</h3>
            <Button onClick={() => {
                setuserDetails(inituserDetails)
                setopen(true)
            }} variant="outlined">Add User</Button>
        </div>
        <div className="row mt-2">
            <div className="col-12 tbl">
                <DataGrid
                    getRowId={(e) => e._id}
                    columns={columns}
                    rows={users}
                    autoHeight={true}
                    pageSize={10}
                    pageSizeOptions={[25, 50, 75, 100]}
                />
            </div>
        </div>
    </>
}