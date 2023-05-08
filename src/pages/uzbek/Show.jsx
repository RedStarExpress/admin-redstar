import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/config'
import Select from 'react-select';

function Show({ data, setData, trackCodeModal, setTrackCodeModal, selected, Alert, setAlert }) {
    const [codes, setCodes] = useState([])
    console.log(trackCodeModal);

    useEffect(() => {
        axiosInstance.get(`/client/getAllNOtPageable`)
            .then((res) => {
                console.log(res?.data);
                const arr = res?.data?.map(item => {
                    return ({ value: item?.id, label: item?.code })
                })
                setCodes(arr);
            })
    }, [])


    const trekCode = useRef()

    const editFunc = () => {
        const trackCodes = trekCode?.current?.value?.split("\n")
        const trackCodes2 = trackCodes.filter((item) => {
            return item.trim() !== ""
        })

        console.log({
            "id": trackCodeModal.id,
            "trackCode": trackCodes2,
            "replace": true
        });
        axiosInstance.post(`/scanner/addTrackCode`, {
            "id": trackCodeModal.id,
            "trackCode": trackCodes2,
            "replace": true
        }).then((res) => {

            const newArr = data?.filter((item) => {
                if (item.id === trackCodeModal.id) {
                    item.trackCodes = res.data?.trackCodes
                }

                return item
            })

            Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi.");
            setData(newArr)
            setTrackCodeModal({ isShow: false, data: [], id: null })
        })

    }


    function TextArea() {
        let string = ""
        trackCodeModal?.data?.forEach((item) => {
            string += item.code + "\n"
        })
        return (
            <textarea className="form-control form-control-lg" rows="10"
                defaultValue={
                    string
                }
                ref={trekCode}
                placeholder="Trek kodlar">
            </textarea>
        )
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Trek kodlarini ko'rish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setTrackCodeModal({ isShow: false, data: [], id: null })}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="mb-3">
                                    <TextArea />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <button className="btn-lg btn btn-primary w-100"
                                    onClick={() => editFunc()}>
                                    O'zgartirish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Show