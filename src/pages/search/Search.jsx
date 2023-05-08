import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../utils/config';
import AlertContent, { Alert } from '../../components/Alert';

export default function Search() {
    const [data, setData] = useState([])
    const [select, setSelect] = useState("0")
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const location = useLocation();
    const trackCodeRef = useRef()

    useEffect(() => {
        if (location.state) {
            axiosInstance.get(`/track/code/findByCode?code=${location.state}`)
                .then((res) => {
                    setData(res.data)
                })
                .catch((err) => {
                    Alert(setAlert, "danger", "Bunday trek kod mavjud emas");
                })
        }
    }, [location])

    const search = (e) => {
        e.preventDefault()
        if (trackCodeRef.current?.value) {
            axiosInstance.get(`/track/code/findByCode?code=${trackCodeRef.current?.value}`)
                .then((res) => {
                    setData(res.data)
                    console.log(res.data);
                })
        }
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <form onSubmit={search}>
                        <div className="d-sm-flex align-items-center justify-content-between w-100">
                            <div className="row mt-2 mb-2 w-100 px-0 mx-0" style={{ margin: "0 auto" }}>
                                <div className="col-lg-4 ps-0">
                                    <input className="form-control" type="text"
                                        placeholder="Trek kodni kiriting"
                                        ref={trackCodeRef}
                                        defaultValue={location.state}
                                        style={{ height: "50px" }} />
                                </div>

                                <div className="col-lg-4">
                                    <select className="form-select w-100"
                                        style={{ height: "48px", width: "250px" }}
                                        onChange={(e) => setSelect(e?.target.value)}
                                    >
                                        <option value={0}>
                                            Barchasi
                                        </option>
                                        <option value={1}>
                                            ZedCargo
                                        </option>
                                        <option value={2}>
                                            Xitoy
                                        </option>
                                    </select>
                                </div>

                                <div className="col-lg-4 pe-0 h-100" >
                                    <button className='btn btn-primary w-100' type='submit'
                                        style={{ height: "50px" }}
                                    >
                                        Qidirish
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="card-body">

                    <table className="table table-primary table-bordered align-middle mb-0 table-striped">
                        <thead>
                            <tr className='text-center'>
                                <th>№</th>
                                <th>Joylashuvi</th>
                                <th>Partiya nomi</th>
                                <th>Trek kodi</th>
                                <th>Karobka raqami / kodi</th>
                                <th>Sanasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (data.length > 0 && select === "0") && data?.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index} className='text-center table-light'>
                                                <th>{index + 1}</th>
                                                <td>{item.country === "Chine" ? "Xitoy" : "ZedCargo"}</td>
                                                <td>{item.partyName}</td>
                                                <td>{item.code}</td>
                                                <td>{item.country === "Chine" ? item?.boxNumber : item?.clientCode}</td>
                                                <td>{item.createDate}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                            {
                                (data.length > 0 && select === "1") && data?.filter((item) => item.country === "ZedCargo")?.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index} className='text-center table-light'>
                                                <th>{index + 1}</th>
                                                <td>{item.country === "Chine" ? "Xitoy" : "ZedCargo"}</td>
                                                <td>{item.partyName}</td>
                                                <td>{item.code}</td>
                                                <td>{item.country === "Chine" ? item?.boxNumber : item?.clientCode}</td>
                                                <td>{item.createDate}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                            {
                                (data.length > 0 && select === "2") && data?.filter((item) => item.country === "Chine")?.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index} className='text-center table-light'>
                                                <th>{index + 1}</th>
                                                <td>{item.country === "Chine" ? "Xitoy" : "ZedCargo"}</td>
                                                <td>{item.partyName}</td>
                                                <td>{item.code}</td>
                                                <td>{item.country === "Chine" ? item?.boxNumber : item?.clientCode}</td>
                                                <td>{item.createDate}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* alert */}
            <AlertContent alert={alert} />
        </>
    )
}
