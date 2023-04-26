import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/config'

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert }) {
    const codeRef = useRef()
    const trekCode = useRef()

    const editFunc = (e) => {
        e.preventDefault()
    }

    const [codes, setCodes] = useState([])

    useEffect(() => {
        axiosInstance.get(`/client/getAll`)
            .then((res) => {
                setCodes(res.data.content);
            })

    }, [])


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
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="mb-3">
                                    <select className="form-select" defaultValue={codes[1]}
                                        style={{ height: "48px" }} ref={codeRef} disabled>
                                        {
                                            codes?.map((item, index) => {
                                                return (
                                                    <option value={item.code} key={index}
                                                        selected={item.code === editModal.item?.clientCode} >
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
                                <button className="btn-lg btn btn-success w-100"
                                    onClick={() => editFunc()}>
                                    Qo'shish
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <textarea className="form-control form-control-lg" rows="10"
                                defaultValue={editModal.item?.trackCodes?.join("\n")}
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

export default EditModal