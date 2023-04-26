import React, { useEffect, useState } from 'react'
import AlertContent, { Alert } from '../../components/Alert';
import Pagination from '../../components/Pagination';
import axiosInstance from '../../utils/config';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import AddModal from './AddModal';
import { AiFillDelete } from "react-icons/ai";

function Uzbek() {
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

    useEffect(() => {
        axiosInstance.get(`/api/vi/party/getAllActive`)
            .then((res) => {
                setParty(res.data);
                setSelected(res.data?.[0]?.id)

                axiosInstance.get(`/scanner/getAllByParty/${res.data?.[0]?.id}?page=${page}&size=${size}`)
                    .then((res) => {
                        setData(res.data.content);
                        setElements(res.data.totalElements)
                    })
            })
    }, [page, size])

    const handlePageClick = (e) => {
        axiosInstance.get(`/scanner/getAllByParty/${selected}?page=${page}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
            })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        setSelected(e.target[0].value)
        axiosInstance.get(`/scanner/getAllByParty/${selected}?page=${page}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
            })
    }

    const changeParty = (e) => {
        setSelected(e.target.value)
        axiosInstance.get(`/scanner/getAllByParty/${e.target.value}?page=${page}&size=${size}`)
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
                        <h2 className="mb-sm-0 font-size-24">Skaner baza</h2>

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
                                <th>Trek kodi</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.length > 0 && data?.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index} className='text-center table-light'>
                                                <th>{index + 1}</th>
                                                <td>{item.clientCode}</td>
                                                <td>
                                                    {
                                                        item?.trackCodes?.map((item2, index) => {
                                                            return (
                                                                <>
                                                                    <span key={index}>{item2?.code}</span>
                                                                    {(index + 1 !== item?.trackCodes?.length) && <hr style={{ margin: "8px 0" }} />}
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td className="text-center">
                                                    {/* <button className="btn btn-success font-size-18 mx-1"
                                                        onClick={() => setEditModal({ isShow: true, item: item })}>
                                                        <i className="bi bi-pencil"></i>
                                                    </button> */}
                                                                                                    <AiFillDelete fontSize={"24px"} cursor={"pointer"} color='#ff3e1d' onClick={() => setDeleteModal({ isShow: true, id: item.id })} />

                                                </td>
                                            </tr>
                                        </>
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

            {/* alert */}
            <AlertContent alert={alert} />
        </>
    )
}

export default Uzbek