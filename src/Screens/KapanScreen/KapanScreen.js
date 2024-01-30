import { Button, IconButton } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import apiHelper from "../../Commen/ApiHelper";
import { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import ManageKapan from "./ManageKapan";

export default function KapanScreen() {
    const [kapans, setkapans] = useState([]);
    const [open, setopen] = useState(false);
    const initKapanDetails = {
        kapan:"",
        totalPcs:0,
        totalLot:0,
        totalWeight:0
    }
    const [kapanDetails, setkapanDetails] = useState(initKapanDetails);

    async function GetKapans(){
        try {
            const result = await apiHelper.listKapan()
            setkapans(result.data.data)
        } catch (error) {
            window.showSnack(error.message, {variant:"error"})
        }
    }


    useEffect(() => {
        GetKapans()
    }, [])


    async function DeleteHandeler(id){
        try {
            if(!window.confirm("Are you sure to Remove this Kapan?")) return
            await apiHelper.deleteKapan(id)
            window.showSnack("Success", {variant:"success"})
            GetKapans()
        } catch (error) {
            window.showSnack(error.message, {variant:"error"})
        }
    }

    const columns = [
        { field: "_id", width: 200, headerName: "ID" },
        { field: "kapan", width: 150, headerName: "Kapan Number" },
        { field: "totalPcs", width: 150, headerName: "Total Pcs" },
        { field: "totalLot", width: 150, headerName: "Total Lot" },
        { field: "totalWeight", width: 150, headerName: "Total Weight" },
        {
            field: "actions", flex: 1, headerName: "Actions", renderCell: (cell) => {
                return <IconButton color="error" onClick={() => DeleteHandeler(cell.row._id)}>
                    <Delete />
                </IconButton>
            }
        },
    ]


    return <>
    <ManageKapan GetKapans={GetKapans} open={open} setOpen={setopen} kapanDetails={kapanDetails} setkapanDetails={setkapanDetails} />
        <div className="d-flex justify-content-between align-items-center">
            <h3>Manage Kapan.</h3>
            <Button variant="outlined" onClick={() => {
                setkapanDetails(initKapanDetails)
                setopen(true)
            }}>Add Kapan</Button>
        </div>
        <div className="row mt-2">
            <div className="col-12 tbl">
                <DataGrid
                    getRowId={(e) => e._id}
                    columns={columns}
                    rows={kapans}
                    autoHeight={true}
                    pageSize={10}
                    pageSizeOptions={[25, 50, 75, 100]}
                />
            </div>
        </div>
    </>
}