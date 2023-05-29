import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../utils/config'
import AlertContent, { Alert } from '../../components/Alert'

export default function Chat() {
    const { telegramId } = useParams()
    const navigate = useNavigate()
    const massageRef = useRef()

    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const [users, setUsers] = useState([])
    const [chats, setChats] = useState([])

    useEffect(() => {
        axiosInstance.get(`/client/full-list-by-chat`).then((res) => {
            setUsers(res.data)
        })
    }, [])

    useEffect(() => {
        telegramId && axiosInstance.get(`/chat/getAll/${telegramId}`).then((res) => {
            setChats(res.data?.reverse())
        })
    }, [telegramId])

    const sendMe = () => {
        axios.get(`https://api.telegram.org/bot6299992125:AAHT5wINsGE-y0rhNNAsfwW9Zygi3zmi04s/sendMessage?chat_id=${telegramId}&text=${massageRef.current?.value}`)
            .then((res2) => {
                axiosInstance.post(`/chat/create`, {
                    "telegramId": telegramId,
                    "massage": massageRef.current.value,
                    "fromMe": true
                }).then((res) => {
                    Alert(setAlert, "success", "Muvafaqqiyatli jo'natildi");
                    massageRef.current.value = ""
                    setChats([...chats, res?.data])
                })
            })
    }

    const SeenFunc = (telegramId) => {
        axiosInstance.patch(`/chat/visibleByTelegram/${telegramId}`).then((res) => {
            const newArr = users.filter((item) => {
                if (item.telegramId === telegramId) {
                    item.countNotVisible = 0
                }
                return item
            })
            setUsers(newArr)
            navigate(`/chats/${telegramId}`)
        })
    }

    const EnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            sendMe()
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card" id="chat3">
                        <div className="card-body" style={{ height: "calc(100vh - 100px)" }}>
                            <div className="row">
                                <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                                    <div className="rounded card" style={{ overflow: "auto" }}>
                                        {/* <div className="input-group rounded mb-3">
                                        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search"
                                            aria-describedby="search-addon" />
                                        <span className="input-group-text border-0" id="search-addon">
                                            <i className="fas fa-search"></i>
                                        </span>
                                    </div> */}

                                        <div data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "calc(100vh - 145px)" }}>
                                            <ul className="list-unstyled mb-0">
                                                {
                                                    users?.map((user, index) => {
                                                        return (
                                                            <li key={index} class={`p-2 border-bottom ${Number(telegramId) === user.telegramId ? "active" : ""}`}>
                                                                <div onClick={() => SeenFunc(user.telegramId)}
                                                                    className="d-flex justify-content-between" 
                                                                    style={{ alignItems: "center", cursor: "pointer" }}>
                                                                    <div className="d-flex flex-row" style={{ alignItems: "center" }}>
                                                                        <div>
                                                                            <img
                                                                                src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                                                                                alt="avatar" className="d-flex align-self-center me-3" width="50" />
                                                                            <span className="badge bg-success badge-dot"></span>
                                                                        </div>
                                                                        <div className="pt-1">
                                                                            <p className="fw-bold mb-0 active-color">{user.fullName}</p>
                                                                            <p className="small text-muted active-color mb-0">{user.telegramId}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="pt-1">
                                                                        <p className="small text-muted mb-1 active-color">{user.code}</p>
                                                                        {
                                                                            user.countNotVisible !== 0 && (<span className="badge bg-danger rounded-pill float-end">
                                                                                <CountUp start={0} end={user.countNotVisible} />
                                                                            </span>)
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-6 col-lg-7 col-xl-8">

                                    <div className="p-3 rounded card " data-mdb-perfect-scrollbar="true"
                                        style={{ position: "relative", height: "calc(100vh - 240px)", overflow: "auto" }}>
                                        {
                                            telegramId ? (
                                                chats?.map((chat, index) => {
                                                    return (
                                                        !chat?.fromMe ? (
                                                            <div key={index} className="d-flex flex-row justify-content-start">
                                                                <div className='w-100'>
                                                                    <p className="small p-2 mb-1 rounded-3" style={{ backgroundColor: "#566a7f", color: "#fff" }}>
                                                                        {chat?.massage}
                                                                    </p>
                                                                    <p className="small ms-3 mb-3 rounded-3 text-muted float-end">{chat?.date}</p>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div key={index} className="d-flex flex-row" style={{alignItems: "center"}}>
                                                                <div className='w-100'>
                                                                    <p className="small p-2 mb-1 text-white rounded-3 bg-primary">
                                                                        {chat?.massage}
                                                                    </p>
                                                                    <p className="small me-3 mb-3 rounded-3 text-muted">{chat?.date}</p>
                                                                </div>
                                                            </div>
                                                        )

                                                    )
                                                })
                                            ) : (
                                                ""
                                            )
                                        }

                                    </div>

                                    <div className="text-muted d-flex justify-content-start align-items-center pt-2 mt-2 w-100">
                                        <img src="../assets/img/avatars/1.png"
                                            alt="avatar 3" style={{ width: "40px", height: "100%", borderRadius: "50%" }} className="me-3" />
                                        <textarea type="text" placeholder="Matn kiriting:" ref={massageRef}
                                            onKeyDown={EnterPress}
                                            className="ml-2 w-100 form-control form-control-lg" id="exampleFormControlInput2"
                                        />
                                        {/* <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a> */}
                                        {/* <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a> */}
                                        <button className="ms-3 border-0 btn btn-primary" style={{ height: "77.6px" }}
                                            onClick={() => sendMe()}>
                                            {/* style={{ color: "rgb(13,110,253)", cursor: "pointer" }} */}
                                            <i className="fas fa-paper-plane"></i>
                                            Yuborish
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* alert */}
            <AlertContent alert={alert} />
        </>

    )
}
