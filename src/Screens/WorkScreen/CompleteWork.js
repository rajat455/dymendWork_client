import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import apiHelper from "../../Commen/ApiHelper"

export default function CompleteWork(props) {
    const { open, setOpen, setWorkCompletedDetails, WorkCompletedDetails, GetReport } = props

    const handleClose = () => {
        setOpen(false)
    }


    const InsertHandeler = async () => {
        try {
            const data = { ...WorkCompletedDetails }
            delete data.lotNumber
            delete data.totalPcs
            await apiHelper.completeWork(data)
            GetReport()
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
            <DialogTitle>Complete Work</DialogTitle>
            <span className="px-4">Lot Number : {WorkCompletedDetails.lotNumber}</span>
            <span className="px-4">Pcs : {WorkCompletedDetails.totalPcs}</span>
            <hr className='m-0' />
            <DialogContent>
                <label htmlFor="completedPcs">Completed Pcs</label>
                <TextField
                    autoFocus
                    onChange={(e) => {
                        if ((Number(e.target.value || 0) || 0) > WorkCompletedDetails.totalPcs) e.target.value = ""
                        setWorkCompletedDetails({ ...WorkCompletedDetails, completedPcs: Number(e.target.value || 0) || 0, rejectedPcs: Number(WorkCompletedDetails.totalPcs) - Number(e.target.value || 0) || 0 })
                    }}
                    required
                    margin="dense"
                    id="completedPcs"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button color={"error"} onClick={handleClose}>Cancel</Button>
                <Button onClick={InsertHandeler}>Complete</Button>
            </DialogActions>
        </Dialog>
    </>
}