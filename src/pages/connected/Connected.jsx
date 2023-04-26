import React, { useEffect, useState } from 'react'
import AlertContent, { Alert } from '../../components/Alert';
import Pagination from '../../components/Pagination';
import axiosInstance from '../../utils/config';
import DeleteModal from './DeleteModal';
import { AiFillDelete } from "react-icons/ai";

function Connected() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [elements, setElements] = useState()
    const [data, setData] = useState([])

    const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })

    const handlePageClick = (e) => {
        axiosInstance.get(`/connected/getAll?page=${e.selected}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
            })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        axiosInstance.get(`/connected/getAll?page=${e.target[0].value - 1}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
            })
    }

    useEffect(() => {
        axiosInstance.get(`/connected/getAll?page=${page}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
                setElements(res.data.totalElements)
            })
    }, [page, size])

    const changeActive = (id) => {
        axiosInstance.patch(`/connected/seen/${id}`)
            .then((res) => {
                Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi");

                const newArr = data.filter((item) => {
                    if (item.id === id) {
                        item.seen = !item.seen
                    }

                    return item
                })

                setData(newArr)
            })
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h2 className="mb-sm-0 font-size-24 text-center">Sayt orqali bog'langanlar</h2>
                </div>

                <div className="card-body">
                    <table className="table table-primary table-bordered align-middle mb-0 table-striped">
                        <thead>
                            <tr className='text-center align-middle'>
                                <th style={{ width: "5%" }}>№</th>
                                <th style={{ width: "15%" }}>Ism familiyasi</th>
                                <th style={{ width: "10%" }}>Telefon raqam</th>
                                <th style={{ width: "10%" }}>Email</th>
                                <th style={{ width: "30%" }}>Kelgan xabar</th>
                                <th style={{ width: "10%" }}>Kelgan vaqti</th>
                                <th style={{ width: "10%" }}>Ko'rilganligi</th>
                                <th style={{ width: "10%" }}>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((item, index) => {
                                    return (
                                        <tr className='text-center table-light' key={index}>
                                            <th>{index + 1}</th>
                                            <td>{item.fullName}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td>{item.message}</td>
                                            <td>{item.comeTime}</td>
                                            <td>
                                                <div className="form-check form-switch text-center" style={{ display: "flex", justifyContent: "center" }}>
                                                    <input className="form-check-input"
                                                        type="checkbox" id="flexSwitchCheckChecked"
                                                        style={{ fontSize: "24px" }}
                                                        checked={item.seen}
                                                        onChange={() => changeActive(item.id)} />
                                                </div>

                                            </td>
                                            <td className="text-center">
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


export default Connected