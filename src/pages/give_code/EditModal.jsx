import React, { useEffect, useRef, useState } from 'react'
import axiosInstance, { url } from '../../utils/config'
import ShowImage from './ShowImage'

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert }) {
    const seriesRef = useRef()
    const pinRef = useRef()

    const [imageShow, setImageShow] = useState("")

    const editFunc = (e) => {
        e.preventDefault()
        axiosInstance.patch(`/client/update`, {
            id: editModal.item.id,
            series: seriesRef.current.value.toUpperCase(),
            pin: pinRef.current.value
        }).then((res) => {
            Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi!");

            const newData = data.filter((item) => {
                if (item.id === editModal.item.id) {
                    item.series = seriesRef.current.value
                    item.pin = pinRef.current.value.toUpperCase()
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
                        <h5 className="modal-title text-white">Clientni tahrirlash</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setEditModal({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={editFunc}>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <a href={`${url}/file/view/${editModal.item?.passportGot}`} target="_blank" rel="noopener noreferrer">
                                        <img src={`${url}/file/view/${editModal.item?.passportGot}`} className="edit-image"
                                            width={"100%"} alt="" />
                                    </a>
                                    <a href={`${editModal.item?.passportGot}`} target="_blank" rel="noopener noreferrer">
                                        <img src={`${editModal.item?.passportGot}`} className="edit-image"
                                            width={"100%"} alt="" />
                                    </a>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <a href={`${url}/file/view/${editModal.item?.passportBack}`} target="_blank" rel="noopener noreferrer">
                                        <img src={`${url}/file/view/${editModal.item?.passportBack}`} className="edit-image"
                                            width={"100%"} alt="" />
                                    </a>
                                    <a href={`${editModal.item?.passportBack}`} target="_blank" rel="noopener noreferrer">
                                        <img src={`${editModal.item?.passportBack}`} className="edit-image"
                                            width={"100%"} alt="" />
                                    </a>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={seriesRef} type="text"
                                            placeholder='Pasport seriasi'
                                            defaultValue={editModal.item.series}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={pinRef} type="text"
                                            placeholder="PNFL"
                                            defaultValue={editModal.item.pin}
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
                </div >
            </div >

            {
                imageShow && (
                    <ShowImage
                        imageShow={imageShow}
                        setImageShow={setImageShow}
                    />
                )
            }
        </div >
    )
}

export default EditModal