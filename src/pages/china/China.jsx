import React, { useEffect, useState } from 'react'
import AlertContent, { Alert } from '../../components/Alert';
import axiosInstance from '../../utils/config';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { AiFillDelete } from 'react-icons/ai';

function China() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [selected, setSelected] = useState(null)
    const [elements, setElements] = useState()
    const [data, setData] = useState([])
    const [party, setParty] = useState([])
    const [trackCodes, setTrackCodes] = useState([])
    const [isShow, setIsShow] = useState(false)

    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState({ isShow: false, item: {} })
    const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })

    useEffect(() => {
        axiosInstance.get(`/api/vi/party/getAllActive`)
            .then((res) => {
                setParty(res.data);
                setSelected(res.data?.[0]?.id)

                axiosInstance.get(`/base/chine/getAll?partyId=${res.data?.[0]?.id}&page=${page}&size=${size}`)
                    .then((res) => {
                        setData(res.data.content);
                        setElements(res.data.totalElements)
                        console.log(res?.data.content);
                    })
            })
    }, [page, size])

    const changeParty = (e) => {
        setSelected(e.target.value)
        axiosInstance.get(`/base/chine/getAll?partyId=${e.target.value}&page=${page}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
                setElements(res.data.totalElements)
            })
    }

    const checkFunc = (code) => {
        const isCode = trackCodes.includes(code)
        if (!isCode) {
            setTrackCodes([...trackCodes, code])
            console.log([...trackCodes, code]);
            setIsShow(true)
        } else {
            const index = trackCodes.indexOf(code);
            console.log(index);
            const newArr = trackCodes.filter(function (item) {
                return item !== code
            })

            console.log(newArr);
            setTrackCodes(newArr)
            if (newArr.length > 0) {
                setIsShow(true)
            } else {
                setIsShow(false)
            }
        }

    }

    const deleteFunc = () => {
        console.log(trackCodes);
        axiosInstance.delete(`/base/chine/removeTrackCodes`, {
            "trackCodes": trackCodes
        }).then((res) => {
            axiosInstance.get(`/api/vi/party/getAllActive`)
                .then((res) => {
                    setParty(res.data);
                    setSelected(res.data?.[0]?.id)

                    axiosInstance.get(`/base/chine/getAll?partyId=${res.data?.[0]?.id}&page=${page}&size=${size}`)
                        .then((res) => {
                            setData(res.data.content);
                            setElements(res.data.totalElements)
                        })
                })
        })
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                        <h2 className="mb-sm-0 font-size-24">Xitoy skaner baza</h2>

                        <div className="d-flex" style={{ alignItems: "center", gap: "8px" }}>

                            <select className="form-select"
                                style={{ height: "48px", width: "250px" }}
                                onChange={(e) => changeParty(e)}>
                                {
                                    party?.length > 0 && party.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                            <button className="btn btn-primary btn-lg"
                                style={{ height: "48px" }}
                                onClick={() => setAddModal(true)}>
                                Yangi qo'shish
                            </button>

                            <button className="btn btn-danger btn-lg"
                                style={{ height: "48px" }}
                                disabled={!isShow}
                                onClick={() => deleteFunc()}>
                                O'chirish
                            </button>

                        </div>
                    </div>
                </div>
                <div className="card-body">

                    <table className="table table-primary table-bordered align-middle mb-0 table-striped">
                        <thead>
                            <tr className='text-center'>
                                <th>№</th>
                                <th>Trek kodi</th>
                                <th>Qo'shilgan sanasi</th>
                                <th>Karobka nomi</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data?.map((item, index) => {
                                    return (
                                        item?.trackCodes?.map((item2, index) => {
                                            return (
                                                <tr key={index} className='text-center table-light'>
                                                    <th>{index + 1}</th>
                                                    <td>
                                                        {item2?.code}
                                                    </td>
                                                    <td>
                                                        {item2?.createDate}
                                                    </td>
                                                    <td>{item2?.boxNumber}</td>
                                                    <td className="text-center">
                                                        <div class="form-check mt-0" style={{ display: "flex", justifyContent: "center" }}>
                                                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"
                                                                onClick={() => checkFunc(item2?.code)} />
                                                        </div>
                                                        {/* <AiFillDelete fontSize={"24px"} cursor={"pointer"} color='#ff3e1d' onClick={() => setDeleteModal({ isShow: true, id: item.id })} /> */}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    {/* <div className="col-lg-12 mt-2">
                        <Pagination
                            page={page}
                            size={size}
                            elements={elements}
                            handlePageClick={handlePageClick}
                            formSubmit={formSubmit}
                        />
                    </div> */}
                </div>
            </div>


            {
                addModal && (
                    <AddModal
                        data={data}
                        setData={setData}
                        addModal={addModal}
                        setAddModal={setAddModal}
                        Alert={Alert}
                        setAlert={setAlert}
                        selected={selected}
                    />
                )
            }

            {
                editModal.isShow && (
                    <EditModal
                        data={data}
                        setData={setData}
                        editModal={editModal}
                        setEditModal={setEditModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {
                deleteModal.isShow && (
                    <DeleteModal
                        data={data}
                        setData={setData}
                        deleteModal={deleteModal}
                        setDeleteModal={setDeleteModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {/* alert */}
            <AlertContent alert={alert} />
        </>
    )
}


export default China