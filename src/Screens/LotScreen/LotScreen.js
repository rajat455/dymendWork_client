import { Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import apiHelper from "../../Commen/ApiHelper";
import { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import ManageLot from "./ManageLot";
import { purpose, role } from "../../Commen/Constents";
import AssignWork from "./AssignWork";

export default function LotScreen() {
    const [Open, setOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const [Lots, setLots] = useState([]);
    const [Kapans, setKapans] = useState([]);
    const initLotDetails = {
        lotNumber: "",
        kapan: false,
        weight: "",
        totalPcs: ""
    }
    const [lotDetails, setlotDetails] = useState(initLotDetails);
    const initWorkDetails = {
        purpose: "",
        totalPcs: "",
        lot: "",
        employee: false,
        availabelPcs: ""
    }
    const [WorkDetails, setWorkDetails] = useState(initWorkDetails);
    const [Managers, setManagers] = useState([]);
    const [Employees, setEmployees] = useState([]);
    const [AssingnToEmployee, setAssingnToEmployee] = useState(false);


    async function GetLot() {
        try {
            setloading(true)
            const result = await apiHelper.listLot()
            setLots(result.data.data)
            setloading(false)
        } catch (error) {
            setloading(false)
            window.showSnack(error.message, { variant: "error" })
        }
    }

    async function getUsers(type) {
        try {
            setloading(true)
            const result = await apiHelper.getUsers(type)
            if (type === role.manager) return setManagers(result.data.data)
            setEmployees(result.data.data)
            setloading(false)
        } catch (error) {
            setloading(false)
            window.showSnack(error.message, { variant: "error" })
        }
    }

    async function getKapans() {
        try {
            setloading(true)
            const result = await apiHelper.listKapan()
            setKapans(result.data.data)
            setloading(false)
        } catch (error) {
            setloading(false)
            window.showSnack(error.message, { variant: "error" })
        }
    }


    const DeleteHandeler = async () => {

    }

    const columns = [
        { field: "_id", width: 200, headerName: "ID" },
        {
            field: "kapan", width: 150, headerName: "Kapan", renderCell: (cell) => {
                return cell.row.kapan.kapan
            }
        },
        { field: "lotNumber", width: 150, headerName: "Lot Number" },
        { field: "weight", width: 150, headerName: "Weight" },
        { field: "totalPcs", width: 150, headerName: "Total Pcs", },
        { field: "availabelPcs", width: 150, headerName: "Row Pcs" },
        { field: "tochingPendingPcs", width: 150, headerName: "Toching Pending Pcs" },
        { field: "tochingCompletedPcs", width: 200, headerName: "Toching Completed Pcs" },
        { field: "fourpPendingPcs", width: 200, headerName: "FourP Pending Pcs" },
        { field: "fourpCompletedPcs", width: 200, headerName: "FourP Completed Pcs" },
        {
            field: "manager", width: 150, headerName: "Manager Fullname", renderCell: (cell) => {
                return cell.row.manager ? (cell.row.manager.firstName + " " + cell.row.manager.lastName) : "N/A"
            }
        },
        {
            field: "actions", width: 450, headerName: "Actions", renderCell: (cell) => {
                return <div className="d-flex gap-2">
                    <IconButton color="error" onClick={() => DeleteHandeler(cell.row._id)}>
                        <Delete />
                    </IconButton>
                    <Button hidden={!cell.row.availabelPcs} color="warning" variant="outlined" onClick={() => {
                        setWorkDetails({
                            ...initWorkDetails,
                            purpose: purpose.toching,
                            availabelPcs: cell.row.availabelPcs,
                            lot: cell.row
                        })
                        setAssingnToEmployee(true)
                    }}>
                        Assign For Toching
                    </Button>
                    <Button hidden={cell.row.availabelPcs > 0 || cell.row.tochingCompletedPcs <= 0 || cell.row.availabelPcs} color="success" variant="outlined" onClick={() => {
                        setWorkDetails({
                            ...initWorkDetails,
                            purpose: purpose.fourP,
                            tochingCompletedPcs: cell.row.tochingCompletedPcs,
                            lot: cell.row
                        })
                        setAssingnToEmployee(true)
                    }}>
                        Assign For 4P
                    </Button>
                </div>
            }
        },
    ]


    useEffect(() => {
        GetLot()
        getKapans()
        getUsers("manager")
        getUsers("employee")
    }, []);






    return <>
        <ManageLot GetLot={GetLot} lotDetails={lotDetails} setlotDetails={setlotDetails} Kapans={Kapans} open={Open} setOpen={setOpen} />
        <AssignWork GetLot={GetLot} open={AssingnToEmployee} setOpen={setAssingnToEmployee} Employees={Employees} Managers={Managers} WorkDetails={WorkDetails} setWorkDetails={setWorkDetails} />
        <div className="d-flex justify-content-between align-items-center">
            <h3>Manage Lot.</h3>
            <Button variant="outlined" onClick={() => {
                setlotDetails(initLotDetails)
                setOpen(true)
            }}>Add Lot</Button>
        </div>
        <div className="row mt-2">
            <div className="col-12 tbl">
                <DataGrid
                    getRowId={(e) => e._id}
                    columns={columns}
                    rows={Lots}
                    loading={loading}
                    autoHeight={true}
                    pageSize={10}
                    pageSizeOptions={[25, 50, 75, 100]}
                />
            </div>
        </div>
    </>
}