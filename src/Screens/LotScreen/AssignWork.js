import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material"
import { purpose } from "../../Commen/Constents"
import apiHelper from "../../Commen/ApiHelper"

export default function AssignWork(props) {
    const { open, setOpen, Employees, GetLot, WorkDetails, setWorkDetails } = props


    const handleClose = () => {
        setOpen(false)
    }

    const InsertHandeler = async () => {
        try {
            const data = { ...WorkDetails, lot: WorkDetails.lot._id }
            if (!data.employee) return window.showSnack("Please select a Employee", { variant: "error" })
            if (!data.totalPcs) return window.showSnack("Please Enter a Valid Pcs.", { variant: "error" })
            delete data.availabelPcs
            await apiHelper.AssignWork(data)
            GetLot()
            window.showSnack("Success", { variant: "success" })
            setOpen(false)
        } catch (error) {
            window.showSnack(error.message, { variant: "error" })
        }
    }

    return <>

        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{WorkDetails.purpose === purpose.toching ? "Assing for Toching" : "Assing For 4P"}</DialogTitle>
            <span className="px-4">Lot Number : {WorkDetails.lot.lotNumber}</span>
            {
                WorkDetails.purpose === purpose.toching ? (<span className="px-4">Row Pcs : {WorkDetails.availabelPcs}</span>) : (
                    <span className="px-4">Toching Completed Pcs : {WorkDetails.tochingCompletedPcs}</span>
                )
            }
            <hr className='m-0' />
            <DialogContent>
                <label htmlFor="employee">Select Employee</label>
                <Select
                    fullWidth
                    className="mt-2 mb-1"
                    value={WorkDetails.employee}
                    size="small"
                    id="employee"
                    onChange={(e) => setWorkDetails({ ...WorkDetails, employee: e.target.value })}
                >
                    <MenuItem value={false} > <i>{"--No-Employee-Selected--"}</i> </MenuItem>
                    {
                        Employees.map((x) => {
                            return <MenuItem key={x._id} value={x._id} > <i>{x.firstName + " " + x.lastName}</i> </MenuItem>
                        })
                    }

                </Select>
                <label htmlFor="totalPcs">Pcs</label>
                <TextField
                    onChange={(e) => {
                        if ((Number(e.target.value || 0) || 0) > WorkDetails.tochingCompletedPcs) {
                            e.target.value = ""
                        }
                        setWorkDetails({ ...WorkDetails, totalPcs: Number(e.target.value || 0) || "" })
                    }}

                    autoFocus
                    required
                    margin="dense"
                    id="totalPcs"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleClose}>Cancel</Button>
                <Button onClick={InsertHandeler}>Assign</Button>
            </DialogActions>
        </Dialog>
    </>
}