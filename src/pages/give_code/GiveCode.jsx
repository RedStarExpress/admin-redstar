import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/config';
import Pagination from '../../components/Pagination';
import AlertContent, { Alert } from '../../components/Alert';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import AddModal from './AddModal';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { downloadExcel } from 'react-export-table-to-excel';

function GiveCode() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [elements, setElements] = useState()
    const [data, setData] = useState([])
    const [teachers, setTeachers] = useState([])
    const [users, setUsers] = useState([])
    const [activTeacher, setActivTeacher] = useState(null)

    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState({ isShow: false, item: {} })
    const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })


    const handlePageClick = (e) => {
        axiosInstance.post(`/client/getAllByTeacher?page=${e.selected}&size=${size}`, {
            id: activTeacher
        })
            .then((res) => {
                setData(res.data.content);
            })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        axiosInstance.post(`/client/getAllByTeacher?page=${e.target[0].value - 1}&size=${size}`, {
            id: activTeacher
        })
            .then((res) => {
                setData(res.data.content);
            })
    }

    useEffect(() => {
        axiosInstance.post(`/client/getAllByTeacher?page=${page}&size=${size}`, {
            id: null
        })
            .then((res) => {
                setData(res.data.content);
                setElements(res.data.totalElements)
            })
    }, [page, size])

    useEffect(() => {
        axiosInstance.get(`/teacher/getAllNotPageable`)
            .then((res) => {
                setTeachers(res.data);
            })
    }, [])

    useEffect(() => {
        axiosInstance.get(`/client/getAllNOtPageable`)
            .then((res) => {
                console.log(res.data);

                const arr = res?.data?.map((item, index) => {
                    const obj = {
                        id: index + 1,
                        fullName: item.fullName,
                        series: item.series,
                        pin: item.pin,
                        address: item.address,
                        telegramId: item.telegramId,
                        code: item.code,
                    }

                    return obj
                })

                setUsers(arr)
            })
    }, [])

    const changeTeacher = (e) => {
        setActivTeacher(e.target.value)
        axiosInstance.post(`/client/getAllByTeacher?page=${page}&size=${size}`, {
            id: e.target.value === "Asosiy table" ? null : e.target.value
        })
            .then((res) => {
                setData(res.data.content);
                setElements(res.data.totalElements)
            })
    }

    const header = ["T/r", "Ism va falimiyasi", "Pasport seriasi", "Pasport PNFL", "Yashash manzili", "Telegram idsi", "Berilgan kodi"];

    function handleDownloadExcel() {
        downloadExcel({
            fileName: "Berilgan kodlar",
            sheet: "Berilgan kodlar",
            tablePayload: {
                header,
                // accept two different data structures
                body: users,
            },
        });
    }

    return (
        <>
            <div className="card">
                <div className="card-header d-sm-flex align-items-center justify-content-between">
                    <h2 className="card-title font-size-24 mb-0 text-center">Berilgan kodlar bazasi</h2>

                    <div className="d-flex" style={{ alignItems: "center", gap: "8px" }}>

                        <select className="form-select"
                            style={{ height: "48px", width: "250px" }}
                            onChange={(e) => changeTeacher(e)}>
                            <option selected>Asosiy table</option>
                            {
                                teachers?.length > 0 && teachers.map((teacher, index) => {
                                    return (
                                        <option value={teacher.id} key={index}>
                                            {teacher.fullName}
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

                        <button className="btn btn-info btn-lg"
                            style={{ height: "48px" }}
                            onClick={() => handleDownloadExcel()}>
                            Excel
                        </button>

                    </div>

                </div>

                <div className="card-body">
                    <div className="tab-content p-0 pt-3">

                        <table className="table table-primary table-bordered align-middle mb-0 table-striped">
                            <thead>
                                <tr className='text-center'>
                                    <th>№</th>
                                    <th>Ism familiyasi</th>
                                    <th>Pasport seriasi va PNFL</th>
                                    <th>Yashash manzili va <br /> telefon raqami</th>
                                    <th>Telegram ID</th>
                                    <th>Berilgan kalit so'zi</th>
                                    <th>Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((item, index) => {
                                        return (
                                            <tr className='text-center table-light' key={index}>
                                                <th>{index + 1}</th>
                                                <td>{item.fullName}</td>
                                                <td>{item.series} <br /> {item.pin}</td>
                                                <td>{item.address} <br />{item.phone}</td>
                                                <td>{item.telegramId}</td>
                                                <td>{item.code}</td>
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

                        <div className="mt-2">
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
                        teachers={teachers}
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

export default GiveCode