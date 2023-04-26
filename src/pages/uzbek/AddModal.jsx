import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/config'

function AddModal({ data, setData, addModal, setAddModal, selected, Alert, setAlert }) {
    const [codes, setCodes] = useState([])

    useEffect(() => {
        axiosInstance.get(`/client/getAllNOtPageable`)
            .then((res) => {
                setCodes(res.data);
            })
    }, [])


    const codeRef = useRef()
    const trekCode = useRef()
    const addFunc = () => {
        const trackCodes = trekCode?.current?.value?.split("\n")
        const trackCodes2 = trackCodes.filter((item) => {
            return item.trim() !== ""
        })

        axiosInstance.post(`/scanner/create`, {
            "partyId": selected,
            "clientCode": codeRef.current.value,
            "trackCodes": trackCodes2
        }).then((res) => {
            Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");

            const isExtant = data.filter((item) => item.clientCode === codeRef.current.value)
            if (isExtant.length > 0) {
                const newArr = data?.filter((item) => {
                    if (item.clientCode === codeRef.current.value) {
                        item.trackCodes = res.data?.trackCodes
                    }

                    return item
                })

                setData(newArr)
            } else {
                setData([...data, res.data])
            }
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
                            <div className="col-lg-9">
                                <div className="mb-3">
                                    <select className="form-select" style={{ height: "48px" }} ref={codeRef}>
                                        {
                                            codes?.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.code}>
                                                        {item.code}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                    {/* <input className="form-control form-control-lg"
                                    ref={code} type="text"
                                    placeholder='Mijoz kodi' /> */}
                                </div>
                            </div>
                            <div className="col-lg-3 mb-3">
                                <button className="btn-lg btn btn-primary w-100"
                                    onClick={() => addFunc()}>
                                    Qo'shish
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <textarea className="form-control form-control-lg" rows="10"
                                ref={trekCode}
                                placeholder="Trek kodlar">
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddModal