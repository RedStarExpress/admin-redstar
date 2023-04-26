import React, { useEffect, useState } from 'react'
import AlertContent, { Alert } from '../../components/Alert';
import Pagination from '../../components/Pagination';
import axiosInstance from '../../utils/config';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import AddModal from './AddModal';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function Teacher() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [elements, setElements] = useState()
    const [data, setData] = useState([])

    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState({ isShow: false, item: {} })
    const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })


    const handlePageClick = (e) => {
        axiosInstance.get(`/teacher/getAll?page=${e.selected}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
            })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        axiosInstance.get(`/teacher/getAll?page=${e.target[0].value - 1}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
            })
    }

    useEffect(() => {
        axiosInstance.get(`/teacher/getAll?page=${page}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
                setElements(res.data.totalElements)
            })
    }, [page, size])

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                        <h2 className="mb-sm-0 font-size-24">Ustozlar bazasi</h2>

                        <div className="page-title-right">
                            <button className="btn btn-primary btn-lg"
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
                                <th>Ism familiyasi</th>
                                <th>Berilgan kalit so'zi</th>
                                <th>Id raqami</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr className='text-center table-light' key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item.fullName}</td>
                                            <td>{item.code}</td>
                                            <td>{item.id}</td>
                                            <td className="text-center">
                                                <AiFillEdit fontSize={"24px"} cursor={"pointer"} color='#71dd37' style={{ margin: "0 8px" }} onClick={() => setEditModal({ isShow: true, item: item })} />
                                                <AiFillDelete fontSize={"24px"} cursor={"pointer"} color='#ff3e1d' onClick={() => setDeleteModal({ isShow: true, id: item.id })} />

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

export default Teacher