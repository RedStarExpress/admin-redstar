import React from "react";
import axios from "axios";
import { url } from "../../utils/config";
import axiosInstance from "../../utils/config";

class SimpleReactFileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fullDatas: [],
            selected: null,
            elements: "",
            data: [],
            page: 0,
            size: 10,
            party: [],
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }
    componentDidMount() {
        axiosInstance.get(`/api/vi/party/getAllActive`).then((res) => {
            // this.state.party(res.data);
            this.setState({
                party: res.data,
                selected: res.data?.[0]?.id,
            });
            // this.state.selected(res.data?.[0]?.id)

            axiosInstance
                .get(
                    `/base/chine/getAll?partyId=${res.data?.[0]?.id}&page=${this.state.page}&size=${this.state.size}`
                )
                .then((res) => {
                    this.state.data(res.data.content);
                    this.state.elements(res.data.totalElements);
                    console.log(res?.data.content);

                    const arr = res.data?.content[0]?.trackCodes?.map(
                        (item, index) => {
                            let obj = {
                                id: index + 1,
                                partyName: res.data?.content[0]?.partyName,
                                code: item.code,
                                boxNumber: item.boxNumber,
                                createDate: item.createDate,
                            };

                            return obj;
                        }
                    );

                    // setData1(arr)
                    // console.log(arr);
                });
        });
    }
    onFormSubmit(e) {
        e.preventDefault(); // Stop form submit
        this.fileUpload(this.state.file).then((response) => {
            let arr = [];

            for (let item of response.data) {
                for (let i of item) {
                    i.boxNumber = item[0].boxNumber;
                    i.partyId = this.state.selected;
                    i.trackCodes = [i.trackCodes];
                    delete i.volume;
                    delete i.weight;
                    delete i.weight_kg;
                    delete i.quantity;
                    delete i.name;
                }
                arr = arr.concat(item);
            }

            this.setState({
                fullDatas: arr,
            });
            console.log(arr);
        });
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }
    fileUpload(file) {
        const urls = url + "/getExcelData";
        const formData = new FormData();
        formData.append("file", file);
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.post(urls, formData, config);
    }

    saveData = () => {
        axiosInstance
            .post(
                `/base/chine/createList`,
                JSON.stringify({ request: [...this.state.fullDatas] })
            )
            .then((res) => {
                alert("success");
            });
        // fetch(url + "/base/chine/createList", JSON.stringify())
        // console.log({request: [...this.state.fullDatas]});
    };

    // capacity: "40*40*45";
    // id: "1号包";
    // weight_kg: "11.74";
    // name: "钢化膜";
    // quantity: "20.0";
    // trackNum: "YT7415582633960";
    // weight: "19.6";

    changeParty = (e) => {
        this.setState({
            selected: e.target.value,
        });

        axiosInstance
            .get(
                `/base/chine/getAll?partyId=${e.target.value}&page=${this.state.page}&size=${this.state.size}`
            )
            .then((res) => {
                // setData(res.data.content);
                // setElements(res.data.totalElements)
                this.setState({
                    data: res.data.content,
                    elements: res.data.totalElements,
                });
            });
    };

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                {/* <input type="file" onChange={this.onChange} /> */}
                <div className="row d-flex align-items-center justify-content-between ">
                    <div className="col-lg-3">
                        <div className="input-group">
                            <input
                                type="file"
                                className="form-control"
                                // accept="images/*"
                                title="Excel file"
                                onChange={(e) => this.onChange(e)}
                                onClick={(e) => (e.target.value = null)}
                            />
                        </div>
                    </div>

                    <div className="col-md-4 d-flex gap-2">
                        <select
                            className="form-select"
                            style={{ width: "250px" }}
                            onChange={(e) => this.changeParty(e)}
                        >
                            {this.state.party?.length > 0 &&
                                this.state.party.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>

                    {/* <button type="submit">Upload</button> */}
                    <div className="col-lg-4 d-flex gap-2">
                        <button
                            className="btn-md btn btn-primary w-50"
                            type="submit"
                        >
                            Qo'shish
                        </button>
                        <button
                            className="btn-md btn btn-success w-50"
                            onClick={this.saveData}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <table className="table table-primary table-bordered align-middle mb-0 table-striped">
                    <thead>
                        <tr className="text-center">
                            <th>№</th>
                            <th>Trek kodi</th>
                            <th>Karobka nomi</th>
                            <th>Qo'shilgan sanasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.fullDatas.map((item, index) => (
                            <tr key={index} className="text-center table-light">
                                <th>{index + 1}</th>
                                <td>{item?.trackCodes}</td>
                                <td>{item?.boxNumber}</td>
                                <td>{item?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        );
    }
}

export default SimpleReactFileUpload;
