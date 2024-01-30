import { Button, Chip } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import apiHelper from "../../Commen/ApiHelper";
import { useEffect, useState } from "react";
import { purpose } from "../../Commen/Constents";
import CompleteWork from "./CompleteWork";

export default function WorkScreen() {
    const [Reports, setReports] = useState([]);
    const [Open, setOpen] = useState(false);
    const initCompletedDetails = {
        lot: "",
        purpose: "",
        completedPcs: "",
        rejectedPcs: "",
        totalPcs: ""
    }
    const [WorkCompletedDetails, setWorkCompletedDetails] = useState(initCompletedDetails);

    const GetReport = async () => {
        try {
            const result = await apiHelper.getWork()
            setReports(result.data.data)
        } catch (error) {
            window.showSnack(error.message, { variant: "error" })
        }
    }

    const columns = [
        { field: "_id", width: 150, headerName: "ID" },
        {
            field: "lot", width: 150, headerName: "Lot", renderCell: (cell) => {
                return cell.row.lot.lotNumber
            }
        },
        {
            field: "kapan", width: 150, headerName: "Kapan", renderCell: (cell) => {
                return cell.row.lot.kapan.kapan
            }
        },
        {
            field: "employee", width: 150, headerName: "Employee", renderCell: (cell) => {
                return cell.row.employee.firstName + " " + cell.row.employee.lastName
            }
        },
        {
            field: "purpose", width: 150, headerName: "Purpose", renderCell: (cell) => {
                if (cell.row.purpose === purpose.toching) return <Chip variant="outlined" color="warning" label={cell.row.purpose.toUpperCase()} />
                return <Chip variant="outlined" color="success" label={cell.row.purpose.toUpperCase()} />
            }
        },
        {
            field: "totalPcs", width: 150, headerName: "Pcs", renderCell: (cell) => {
                return <Chip color="warning" variant="filled" label={cell.row.totalPcs} />
            }
        },
        {
            field: "completedPcs", width: 150, headerName: "Completed Pcs", renderCell: (cell) => {
                return <Chip color="success" variant="filled" label={cell.row.completedPcs} />
            }
        },
        {
            field: "rejectedPcs", width: 150, headerName: "Rejected Pcs", renderCell: (cell) => {
                return <Chip color="error" variant="filled" label={cell.row.rejectedPcs} />
            }
        },
        {
            field: "Complete Work", width: 170, headerName: "Complete Work", renderCell: (cell) => {
                return <Button disabled={cell.row.completedPcs > 0} variant="contained" color="success" onClick={(e) => {
                    setWorkCompletedDetails({
                        _id: cell.row._id,
                        lot: cell.row.lot._id,
                        lotNumber: cell.row.lot.lotNumber,
                        purpose: cell.row.purpose,
                        completedPcs: cell.row.completedPcs,
                        rejectedPcs: cell.row.rejectedPcs,
                        totalPcs: cell.row.totalPcs
                    })
                    setOpen(true)
                }} >Complete Work</Button>
            }
        },
    ]
    useEffect(() => {
        GetReport()
    }, [])


    return <>
        <CompleteWork open={Open} setOpen={setOpen} WorkCompletedDetails={WorkCompletedDetails} setWorkCompletedDetails={setWorkCompletedDetails} GetReport={GetReport} />
        <div className="d-flex justify-content-between align-items-center">
            <h3>Manage Kapan.</h3>
            <Button variant="outlined">Work Report.</Button>
        </div>
        <div className="row mt-2">
            <div className="col-12 tbl">
                <DataGrid
                    getRowId={(e) => e._id}
                    columns={columns}
                    rows={Reports}
                    autoHeight={true}
                    pageSize={100}
                    initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: window.innerWidth >= 568 ? 8 : 10,
                          },
                        },
                      }}
                />
            </div>
        </div>
    </>
}