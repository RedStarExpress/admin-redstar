import React, { useEffect, useState } from 'react'
import AlertContent, { Alert } from '../../components/Alert';
import Pagination from '../../components/Pagination';
import axiosInstance from '../../utils/config';
import AddModal from './AddModal';
import { AiFillDelete } from "react-icons/ai";
import PaidModal from './PaidModal';
import DeleteModal from './DeleteModal';

function Hisobotlar() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [selected, setSelected] = useState(null)
    const [elements, setElements] = useState()
    const [data, setData] = useState([])
    const [party, setParty] = useState([])

    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState({ isShow: false, item: {} })
    const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })
    const [paidModal, setPaidModal] = useState({ isShow: false, id: 0 })
    const [trackCodeModal, setTrackCodeModal] = useState({ isShow: false, data: [], clientCode: null })

    useEffect(() => {
        axiosInstance.get(`/api/vi/party/getAllActive`)
            .then((res) => {
                setParty(res.data);
                setSelected(res.data?.[0]?.id)

                axiosInstance.get(`/api/v1/report/list/${res.data?.[0]?.id}?page=${page}&size=${size}`)
                    .then((res) => {
                        console.log(res.data);
                        setData(res.data.content);
                        setElements(res.data.totalElements)
                    })
            })
    }, [page, size])

    const handlePageClick = (e) => {
        axiosInstance.get(`/api/v1/report/list/${selected}?page=${page}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
            })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        setSelected(e.target[0].value)
        axiosInstance.get(`/api/v1/report/list/${selected}?page=${page}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
            })
    }

    const changeParty = (e) => {
        setSelected(e.target.value)
        axiosInstance.get(`/api/v1/report/list/${e.target.value}?page=${page}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
                setElements(res.data.totalElements)
            })
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                        <h2 className="mb-sm-0 font-size-24">Hisobotlar</h2>

                        <div className="d-flex" style={{ alignItems: "center", gap: "8px" }}>

                            <select className="form-select"
                                style={{ height: "48px", width: "250px" }}
                                onChange={(e) => changeParty(e)}>
                                {
                                    party?.length > 0 && party.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                            <button className="btn btn-primary btn-lg"
                                style={{ height: "48px" }}
                                onClick={() => setAddModal(true)}>
                                Yangi qo'shish
                            </button>

                        </div>
                    </div>
                </div>
                <div className="card-body">

                    <table className="table table-primary table-bordered align-middle mb-0 table-striped">
                        <thead>
                            <tr className='text-center'>
                                <th>№</th>
                                <th>Mijoz kodi</th>
                                <th>Kilosi (kg)</th>
                                <th>Karobka narxi ($)</th>
                                <th>Kilo narxi ($)</th>
                                <th>Summa ($)</th>
                                <th>Summa (so'm)</th>
                                <th>To'langanligi</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.length > 0 && data?.map((item, index) => {
                                    return (
                                        <tr className='text-center table-light' key={index}>
                                            <th className="text-center">{index + 1}</th>
                                            <td className="text-center">{item.clientCode}</td>
                                            <td className="text-center">{item.weight}</td>
                                            <td className="text-center">{item.boxPrice}</td>
                                            <td className="text-center">{item.weightPrice}</td>
                                            <td className="text-center">{item.weight * item.weightPrice + item.boxPrice}</td>
                                            <td className="text-center">{(item.weight * item.weightPrice + item.boxPrice) * item.currency}</td>
                                            <td className="text-center">
                                                {!item.paid ? (<button className="btn btn-primary"
                                                    onClick={() => setPaidModal({ isShow: true, id: 1 })}>
                                                    To'lash
                                                </button>) : "To'landi"
                                                }
                                            </td>
                                            <td className="text-center">
                                                {/* <AiFillEdit fontSize={"24px"} cursor={"pointer"} color='#71dd37' style={{ margin: "0 8px" }}
                                                onClick={() => setEditModal({ isShow: true, item: item })}
                                                /> */}
                                                <AiFillDelete fontSize={"24px"} cursor={"pointer"} color='#ff3e1d'
                                                    onClick={() => setDeleteModal({ isShow: true, id: item.id })}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>

                    <div className="col-lg-12 mt-2">
                        <Pagination
                            page={page}
                            size={size}
                            elements={elements}
                            handlePageClick={handlePageClick}
                            formSubmit={formSubmit}
                        />
                    </div>
                </div>
            </div>


            {
                addModal && (
                    <AddModal
                        data={data}
                        setData={setData}
                        addModal={addModal}
                        setAddModal={setAddModal}
                        Alert={Alert}
                        setAlert={setAlert}
                        selected={selected}
                    />
                )
            }

            {
                paidModal.isShow && (
                    <PaidModal
                        data={data}
                        setData={setData}
                        paidModal={paidModal}
                        setPaidModal={setPaidModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {
                deleteModal.isShow && (
                    <DeleteModal
                        data={data}
                        setData={setData}
                        deleteModal={deleteModal}
                        setDeleteModal={setDeleteModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {/* {
                editModal.isShow && (
                    <EditModal
                        data={data}
                        setData={setData}
                        editModal={editModal}
                        setEditModal={setEditModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

             */}


            {/* alert */}
            <AlertContent alert={alert} />
        </>
    )
}

export default Hisobotlar