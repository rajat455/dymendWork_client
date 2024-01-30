import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import apiHelper from "../../Commen/ApiHelper";

export default function ManageKapan(props) {
    const { open, setOpen, GetKapans, kapanDetails, setkapanDetails } = props
    const handleClose = () => {
        setOpen(false);
    };


    const InsertHandeler = async () => {
        try {
            if (!kapanDetails.kapan) return window.showSnack("Please Enter a Valid Kapan Number", {variant:"error"})
            const data = {
                kapan: kapanDetails.kapan,
                totalPcs: Number(kapanDetails.totalPcs),
                totalLot: Number(kapanDetails.totalLot),
                totalWeight: Number(kapanDetails.totalWeight),
            }
            if (isNaN(data.totalLot)) return window.showSnack("Please Enter a Valid Lot total", {variant:"error"})
            if (isNaN(data.totalPcs)) return window.showSnack("Please Enter a Valid Pcs total", {variant:"error"})
            if (isNaN(data.totalWeight)) return window.showSnack("Please Enter a Valid Weight of kapan", {variant:"error"})

            await apiHelper.InsertKapan(data)
            GetKapans()
            setOpen(false)
            window.showSnack("Success", { variant: "success" })
        } catch (error) {
            window.showSnack(error.message, { variant: "error" })
        }
    }




    return <>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Create Kapan</DialogTitle>
            <hr className='m-0' />
            <DialogContent>
                <label htmlFor="kapan">Kapan Number</label>
                <TextField
                    autoFocus
                    onChange={(e) => setkapanDetails({ ...kapanDetails, kapan: e.target.value })}
                    required
                    margin="dense"
                    id="kapan"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
                <label htmlFor="totalLot">Total Lot</label>
                <TextField
                    // onWheel={onWeel}
                    onChange={(e) => setkapanDetails({ ...kapanDetails, totalLot: e.target.value })}
                    required
                    margin="dense"
                    id="totalLot"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
                <label htmlFor="totalPcs">Total Pcs</label>
                <TextField
                    onChange={(e) => setkapanDetails({ ...kapanDetails, totalPcs: e.target.value })}
                    required
                    margin="dense"
                    id="totalPcs"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
                <label htmlFor="totalWeight">Total Waight</label>
                <TextField
                    onChange={(e) => setkapanDetails({ ...kapanDetails, totalWeight: e.target.value })}
                    required
                    margin="dense"
                    id="totalWeight"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />

            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleClose}>Cancel</Button>
                <Button onClick={InsertHandeler}>Add</Button>
            </DialogActions>
        </Dialog>
    </>
}