import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateCompanyLogoAPI } from "../../services/api.services";

const CompanyDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadCompany } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleUploadLogo = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }

    }

    const handleUpdateCompanyLogo = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "company");
        if (resUpload.data) {
            //success
            const newLogo = resUpload.data.fileName;
            //step 2: update company
            const resUpdateLogo = await updateCompanyLogoAPI(newLogo, dataDetail.id, dataDetail.name, dataDetail.address, dataDetail.description);
            if (resUpdateLogo.data) {
                setIsDetailOpen(false)
                setSelectedFile(null)
                setPreview(null)
                await loadCompany()
                notification.success({
                    message: "Success upload file",
                    description: "Update success",
                    duration: 2, //Thời gian hiển thị
                    showProgress: true,
                    pauseOnHover: true
                })
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpdateLogo.message),
                    duration: 2, //Thời gian hiển thị
                    showProgress: true,
                    pauseOnHover: true
                })
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message),
                duration: 2, //Thời gian hiển thị
                showProgress: true,
                pauseOnHover: true
            })
        }



    }

    return (
        <>
            <Drawer
                width={"40vw"}
                title="User Detail"
                onClose={() => {
                    setDataDetail(null)
                    setIsDetailOpen(false)
                }}
                open={isDetailOpen}>
                {dataDetail ?
                    <>
                        <p>Id: {dataDetail.id}</p>
                        <br />
                        <p>Fullname: {dataDetail.name}</p>
                        <br />
                        <p>Address: {dataDetail.address}</p>
                        <br />
                        {/* <p>Description: <br />{dataDetail.description}</p> */}
                        <p>Logo</p>
                        <div
                            style={{
                                marginTop: "10px",
                                height: "100px", width: "150px",
                                border: "1px solid #ccc"
                            }}
                        >

                            <img style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/storage/company/${dataDetail.logo}`} alt="" />
                        </div>
                        <div>
                            <label htmlFor="btnUpload"
                                style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px",
                                    background: "green",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >Upload Logo</label>
                            <input
                                type="file" id="btnUpload" hidden
                                onChange={handleUploadLogo}
                            />
                        </div>
                        {preview &&
                            <>
                                <div
                                    style={{
                                        marginTop: "10px",
                                        height: "100px", width: "150px",
                                        border: "1px solid #ccc",
                                        marginBottom: "5px"
                                    }}
                                >

                                    <img style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        src={preview} alt="" />
                                </div>
                                <Button type="primary"
                                    onClick={() => handleUpdateCompanyLogo()}
                                >Save</Button>
                            </>
                        }
                    </>

                    :
                    <>
                        <p>Không có dữ liệu</p>
                    </>
                }

            </Drawer>
        </>
    );

};

export default CompanyDetail;