import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../utils/config'
// import Select from 'react-select';

function AddModal({ data, setData, addModal, setAddModal, selected, Alert, setAlert }) {
    const [codes, setCodes] = useState([])
    const kiloRef = useRef()
    const priceRef = useRef()
    const karobkaRef = useRef()
    const dollarRef = useRef()
    const bonusRef = useRef()

    useEffect(() => {
        axiosInstance.get(`/client/getAllNOtPageable`)
            .then((res) => {
                console.log(res?.data);
                const arr = res?.data?.map(item => {
                    return ({ value: item?.id, label: item?.code, representative: item?.representative })
                })
                setCodes(arr);
            })
    }, [])


    const codeRef = useRef()

    const addFunc = () => {
        let weight = Number(kiloRef.current?.value);
        let weightPrice = Number(priceRef.current?.value)
        let boxPrice = Number(karobkaRef.current?.value)
        let currency = Number(dollarRef.current?.value)
        let dollar = Number(dollarRef.current?.value)
        let bonus = Number(bonusRef.current?.value)

        console.log({
            partyId: selected,
            clientCode: codeRef?.current?.props?.value?.label,
            weight: weight,
            weightPrice: weightPrice,
            boxPrice: boxPrice,
            currency: currency,
            dollar: dollar,
        });

        axiosInstance.post(`/api/v1/report/create`, {
            partyId: selected,
            clientCode: codeRef?.current?.props?.value?.label,
            weight: weight,
            weightPrice: weightPrice,
            boxPrice: boxPrice,
            currency: currency,
        }).then((res) => {
            setData([res.data, ...data])

            console.log({
                currency: currency,
                money: (weight * weightPrice + boxPrice) * bonus,
                code: codeRef?.current?.props?.value?.representative
            });

            axiosInstance.put(`/api/v1/accounting/add-money`, {
                currency: currency,
                money: (weight * weightPrice + boxPrice) * bonus,
                code: codeRef?.current?.props?.value?.representative
            })

            Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");
            setAddModal(false)
        })
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Yangi qo'shish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setAddModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    {/* <Select
                                        ref={codeRef}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        defaultValue={codes[0]}
                                        isDisabled={false}
                                        isClearable={true}
                                        isSearchable={true}
                                        name="color"
                                        options={codes}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                height: "48px",
                                            }),
                                        }}
                                    /> */}
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <input className="form-control form-control-lg"
                                        ref={kiloRef}
                                        type="number" placeholder='Kilo (kg)' />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <input className="form-control form-control-lg"
                                        ref={priceRef}
                                        type="number" placeholder='Kilo narxi' />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <input className="form-control form-control-lg"
                                        ref={karobkaRef}
                                        type="number" placeholder='Karobka narxi' />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <input className="form-control form-control-lg"
                                        ref={dollarRef}
                                        type="number" placeholder='Dollar kursi' />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <input className="form-control form-control-lg"
                                        ref={bonusRef}
                                        type="number" placeholder='Bonus' />
                                </div>
                            </div>


                            <div className="col-lg-12">
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