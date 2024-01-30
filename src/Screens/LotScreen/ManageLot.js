import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material"
import apiHelper from "../../Commen/ApiHelper"

export default function ManageLot(props) {
    const { open, setOpen,GetLot, Kapans, lotDetails, setlotDetails } = props

    const handleClose = () => {
        setOpen(false)
    }



    const InsertHandeler = async () => {
        try {
            const data = {
                ...lotDetails,
                totalPcs: Number(lotDetails.totalPcs),
                weight: Number(lotDetails.weight),
            }
            if (!data.kapan) return window.showSnack("Please Select A Kapan", { variant: "error" })
            if (!data.lotNumber) return window.showSnack("Please Enter A Valid Lot Number", { variant: "error" })
            if (isNaN(data.totalPcs) || data.totalPcs <= 0) return window.showSnack("Please Enter A Valid Total of Pcs", { variant: "error" })
            if (isNaN(data.weight) || data.weight <= 0) return window.showSnack("Please Enter A Valid Weight of Lot", { variant: "error" })
            await apiHelper.insertLot(data)
            GetLot()
            window.showSnack("Success", {variant:"success"})
            setOpen(false)
        } catch (error) {
            window.showSnack(error.message, {variant:"error"})
        }
    }




    return <>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Insert Lot</DialogTitle>
            <hr className='m-0' />
            <DialogContent>
                <label htmlFor="kapan">Select Kapan</label>
                <Select
                    fullWidth
                    className="mt-2 mb-1"
                    value={lotDetails.kapan}
                    size="small"
                    id="kapan"
                    onChange={(e) => setlotDetails({ ...lotDetails, kapan: e.target.value })}
                >
                    <MenuItem value={false} > <i>{"--No-Kapan-Selected--"}</i> </MenuItem>
                    {
                        Kapans.map((x) => {
                            return <MenuItem key={x._id} value={x._id} > <i>{x.kapan}</i> </MenuItem>
                        })
                    }

                </Select>
                <label htmlFor="lotNumber">Lot Number</label>
                <TextField
                    onChange={(e) => setlotDetails({ ...lotDetails, lotNumber: e.target.value })}
                    autoFocus
                    required
                    margin="dense"
                    id="lotNumber"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
                <label htmlFor="totalPcs">Total Pcs</label>
                <TextField
                    onChange={(e) => setlotDetails({ ...lotDetails, totalPcs: e.target.value })}
                    autoFocus
                    required
                    margin="dense"
                    id="totalPcs"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
                <label htmlFor="weight">Weight</label>
                <TextField
                    onChange={(e) => setlotDetails({ ...lotDetails, weight: e.target.value })}
                    autoFocus
                    required
                    margin="dense"
                    id="weight"
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