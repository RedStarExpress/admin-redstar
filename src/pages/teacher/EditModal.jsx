import React, { useRef } from 'react'
import axiosInstance from '../../utils/config'

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert }) {
    const nameRef = useRef()
    const codeRef = useRef()

    const editFunc = (e) => {
        e.preventDefault()

        axiosInstance.put(`/teacher/update`, {
            id: editModal.item.id,
            fullName: nameRef.current.value,
            code: codeRef.current.value.toUpperCase()
        }).then((res) => {
            Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi!");

            const newData = data.filter((item) => {
                if (item.id === editModal.item.id) {
                    item.fullName = nameRef.current.value
                    item.code = codeRef.current.value.toUpperCase()
                }

                return item
            })

            setData(newData)
            setEditModal({ isShow: false, item: {} })
        })
    }
    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Ustozni tahrirlash</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setEditModal({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={editFunc}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={nameRef} type="text"
                                            placeholder='Ism familiyasi'
                                            defaultValue={editModal.item.fullName}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={codeRef} type="text"
                                            disabled
                                            placeholder="Berilgan kalit so'zi"
                                            defaultValue={editModal.item.code}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <button className="btn-lg btn btn-primary w-100" type='submit'>
                                        O'zgartirish
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

export default EditModal