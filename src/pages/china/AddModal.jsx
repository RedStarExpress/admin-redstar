import React, { useRef } from 'react'
import axiosInstance from '../../utils/config'

function AddModal({ data, setData, addModal, setAddModal, selected, Alert, setAlert }) {
    const trekCode = useRef()
    const addFunc = () => {
        const trackCodes = trekCode?.current?.value?.split("\n")
        const trackCodes2 = trackCodes.filter((item) => {
            return item.trim() !== ""
        })

        axiosInstance.post(`/base/chine/create`, {
            "partyId": selected,
            "trackCodes": trackCodes2
        }).then((res) => {
            const newData = data?.filter((item) => {
                item.trackCodes = res?.data?.trackCodes
                return item
            })
            setData(newData)
            Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");
            setAddModal(false)
        })
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Yangi mijoz qo'shish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setAddModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <textarea className="form-control form-control-lg" rows="10"
                                    ref={trekCode}
                                    placeholder="Trek kodlar">
                                </textarea>
                            </div>

                            <div className="col-lg-12 mb-0">
                                <button className="btn-lg btn btn-primary w-100"
                                    onClick={() => addFunc()}>
                                    Qo'shish
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddModal