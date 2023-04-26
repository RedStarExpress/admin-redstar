import React, { useRef } from 'react'
import axiosInstance from "../../utils/config"

function AddModal({ data, setData, addModal, setAddModal, Alert, setAlert }) {
    const nameRef = useRef()
    const codeRef = useRef()

    const addFunc = (e) => {
        e.preventDefault()
        axiosInstance.post(`/teacher/create`, {
            fullName: nameRef.current.value,
            code: codeRef.current.value.toUpperCase()
        }).then((res) => {
            Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");
            setData([...data, res.data])
            setAddModal(false)
        })
    }
    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Yangi ustoz qo'shish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setAddModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={addFunc}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={nameRef} type="text"
                                            placeholder='Ism familiyasi' />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={codeRef} type="text"
                                            placeholder="Berilgan kalit so'zi" />
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
                </div>
            </div>
        </div>
    )
}

export default AddModal