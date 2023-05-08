import React from 'react'
import axiosInstance from '../../utils/config';

function PaidModal({ data, setData, paidModal, setPaidModal, Alert, setAlert }) {
    const paidFunc = (e) => {
        e.preventDefault()
        axiosInstance.get(`/api/v1/report/paid/${paidModal.id}`).then((res) => {
            const newData = data.map((item) => {
                if (item.id === paidModal.id) {
                    item.paid = !item.paid
                }

                return item
            })

            Alert(setAlert, "success", "Muvafaqqiyatli to'landi!");
            setData(newData)
            setPaidModal({ isShow: false, id: 0 })
        })
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">To'lash</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setPaidModal({ isShow: false, id: 0 })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={paidFunc}>
                            <h3 className='text-center mb-3'>Haqiqatdan ham ushbu mijoz pulini to'ladimi?</h3>
                            <div className="row">
                                <div className="col-lg-6 mb-2">
                                    <button className="btn-lg btn btn-success w-100" type='submit'>
                                        Ha, To'ladi
                                    </button>
                                </div>

                                <div className="col-lg-6">
                                    <button className="btn-lg btn btn-secondary w-100" type='button'
                                        onClick={() => setPaidModal({ isShow: false, id: 0 })}>
                                        Bekor qilish
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

export default PaidModal