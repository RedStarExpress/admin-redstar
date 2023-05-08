import axios from 'axios'
import React, { useRef, useState } from 'react'
import axiosInstance, { url } from '../../utils/config'

function AddModal({ data, setData, addModal, setAddModal, Alert, setAlert, teachers }) {
    const nameRef = useRef()
    const telegramIdRef = useRef()
    const addressRef = useRef()
    const phoneRef = useRef()
    const codeRef = useRef()
    const teaacherId = useRef()

    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)

    const addFunc = async (e) => {
        e.preventDefault()

        const formData1 = new FormData();
        formData1.append("request", file1);

        const formData2 = new FormData();
        formData2.append("request", file2);

        const token = localStorage.getItem('token');
        let fileId1 = ""
        let fileId2 = ""
        try {
            const res = await axios.post(`${url}/file/upload`, formData1, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": token ? `Bearer ${token}` : ''
                }
            })
            fileId1 = res.data
        } catch {
            console.log("xatooo");
        }


        try {
            const res = await axios.post(`${url}/file/upload`, formData2, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": token ? `Bearer ${token}` : ''
                }
            })
            fileId2 = res.data
        } catch {
            console.log("xatooo");
        }

        try {
            if (fileId1 && fileId2) {
                await axiosInstance.post(`/client/create`, {
                    "fullName": nameRef.current.value,
                    "passportGot": String(fileId1),
                    "passportBack": String(fileId2),
                    "telegramId": Number(telegramIdRef.current.value),
                    "address": addressRef.current.value,
                    "phone": phoneRef.current.value,
                    // "code": codeRef.current.value,
                    "teacherId": (teaacherId.current.value === "O'zim o'rganganman" || teaacherId.current.value === "Ustozim boshqa") ? null : teaacherId.current.value
                }).then((res) => {
                    Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");
                    setData([...data, res.data])
                    setAddModal(false)
                })
            }
        } catch {
            console.log("xatooo");
        }

    }

    const changeFile1 = (e) => {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        setFile1(e.target.files[0]);
    }

    const changeFile2 = (e) => {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        setFile2(e.target.files[0]);
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Yangi kod berish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setAddModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={addFunc}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={nameRef} type="text"
                                            placeholder='Ism familiyasi' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={addressRef} type="text"
                                            placeholder='Yashash manzili' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={phoneRef} type="text"
                                            placeholder='Telefon raqami' />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={telegramIdRef} type="text"
                                            placeholder='Telegram idsi' />
                                    </div>
                                </div>

                                {/* <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={codeRef} type="text"
                                            placeholder="Berilgan kalit so'zi" />
                                    </div>
                                </div> */}

                                <div className="col-lg-12">
                                    <select className="form-select mb-3 w-100"
                                        style={{ height: "48px", width: "250px" }}
                                        ref={teaacherId}>
                                        <option selected>Ustozim boshqa</option>
                                        <option>O'zim o'rganganman</option>
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
                                </div>

                                <div className="col-lg-6">
                                    <div className="input-group mb-3">
                                        <input type="file"
                                            className="form-control"
                                            accept="image/*"
                                            title='pasport old rasmi'
                                            onChange={(e) => changeFile1(e)}
                                            onClick={(e) => e.target.value = null}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="input-group mb-3">
                                        <input type="file"
                                            className="form-control"
                                            accept="image/*"
                                            title='pasport orqa rasmi'
                                            onChange={(e) => changeFile2(e)}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        {file1 && <img
                                            style={{ maxWidth: "100%" }}
                                            src={URL?.createObjectURL(file1)} alt="" />}
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        {file2 && <img
                                            style={{ maxWidth: "100%" }}
                                            src={URL?.createObjectURL(file2)} alt="" />}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <button className="btn-lg btn btn-primary w-100" type='submit'>
                                        Qo'shish
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </div >
    )
}

export default AddModal