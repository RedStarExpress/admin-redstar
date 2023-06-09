import React, { useRef } from 'react'
import axiosInstance from '../../utils/config'
import ReactInputMask from 'react-input-mask'

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert }) {
    const nameRef = useRef()
    const dateRef = useRef()

    const editFunc = (e) => {
        e.preventDefault()
        console.log({
            id: editModal.item.id,
            name: nameRef.current.value,
            arrivalDate: dateRef.current.value
        });
        axiosInstance.put(`/api/vi/party/update`, {
            id: editModal.item.id,
            name: nameRef.current.value,
            arrivalDate: dateRef.current.value
        }).then((res) => {
            Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi!");

            const newData = data.filter((item) => {
                if (item.id === editModal.item.id) {
                    item.name = nameRef.current.value
                    item.date = dateRef.current.value
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
                                            placeholder='Partiyani nomini kiriting'
                                            defaultValue={editModal.item.name}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <ReactInputMask mask="99-99-9999" className="form-control form-control-lg"
                                            ref={dateRef} type="text"
                                            placeholder="Kelgan sanasi"
                                            defaultValue={editModal.item.date}
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