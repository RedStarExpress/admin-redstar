import React, { useRef } from 'react'
import axiosInstance from '../../utils/config'
import ReactInputMask from 'react-input-mask'

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert }) {
    const moneyRef = useRef()
    const currencyRef = useRef()

    const editFunc = (e) => {
        e.preventDefault()
        console.log({
            id: editModal.item.id,
            money: Number(moneyRef.current.value),
            currency: Number(currencyRef.current.value)
        });
        axiosInstance.put(`/api/v1/accounting/change`, {
            id: editModal.item.id,
            money: Number(moneyRef.current.value),
            currency: Number(currencyRef.current.value)
        }).then((res) => {
            Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi!");

            const newData = data.filter((item) => {
                if (item.id === editModal.item.id) {
                    item.money = Number(moneyRef.current.value)
                    item.currency = Number(currencyRef.current.value)
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
                        <h5 className="modal-title text-white">Tahrirlash</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setEditModal({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={editFunc}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={moneyRef} type="text"
                                            placeholder='Hisobi'
                                            defaultValue={editModal.item.money}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={currencyRef} type="text"
                                            placeholder="Dollar kursi"
                                            defaultValue={editModal.item.currency}
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