import Device from "../models/productDevice.js";
import DeviceServices from "./../services/productServiceDevice.js";
import Validation from "../services/validation.js";
const getId = id => document.getElementById(id);
const deviceServices = new DeviceServices;
$('.modal').on('hidden.bs.modal', function () {
    $(this)
        .find("input:not([type=hidden]),textarea,select")
        .val('')
        .end()
        .find("input[type=checkbox], input[type=radio]")
        .prop("checked", "")
        .end();
});


const resetValidation = (id) => {
    getId(id).style.display = "none";
    getId(id).innerHTML = "";
};
window.resetValidation = resetValidation;

// tạo đối tượng
const getInfoDevices = () => {
    const TenSP = getId("TenSP").value;
    const GiaSP = getId("GiaSP").value;
    const screenSP = getId("screenSP").value;
    const backCameraSP = getId("backCameraSP").value;
    const frontCameraSP = getId("frontCameraSP").value;
    const HinhSP = getId("HinhSP").value;
    const descS = getId("descSP").value;
    const loaiSP = getId("loaiSP").value;
    const loaiSPindex = getId("loaiSP").selectedIndex;
    // const vStringAZ_Num = /^[0-9a-zA-Z]+$/;
    const vStringAZNum_VN = /^[0-9a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +"\-_!$%^&*()_+|~=`{}\[\]:";'<>?,.\/`*?"+ "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ"]|[\\b]+$/;
    const vNuminteger = /^[0-9]+$/;
    const vImgLink = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
    // const vPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    // const vEMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // Validation
    let isValidation = true;
    const validation = new Validation;
    isValidation &= validation.checkTring(TenSP, "errorTen", 1, 100, vStringAZNum_VN, `(*)Vui lòng nhập tên`, `(*)Nhập từ 1 đến 100 kí tự chữ và số`, `(*)Chỉ nhập chữ và số`);
    isValidation &= validation.checkTring(GiaSP, "errorGia", 1, 20, vNuminteger, `(*)Vui lòng nhập giá`, `(*)Nhập từ 1 đến 20 kí tự số`, `(*)Chỉ nhập số không có khoảng cách`);
    isValidation &= validation.checkTring(screenSP, "errorScreen", 1, 100, vStringAZNum_VN, `(*)Vui lòng nhập thông số màn hình`, `(*)Nhập từ 1 đến 20 kí tự chữ và số`, `(*)Chỉ nhập chữ và số`);
    isValidation &= validation.checkTring(backCameraSP, "errorBackCamera", 1, 1000, vStringAZNum_VN, `(*)Vui lòng nhập thông số camera sau`, `(*)Nhập từ 1 đến 1000 kí tự chữ và số`, `(*)Chỉ nhập chữ và số`);
    isValidation &= validation.checkTring(frontCameraSP, "errorFrontCamera", 1, 1000, vStringAZNum_VN, `(*)Vui lòng nhập thông số camera trước`, `(*)Nhập từ 1 đến 100000 kí tự chữ và số`, `(*)Chỉ nhập chữ và số`);
    isValidation &= validation.checkTring(HinhSP, "errorHinh", 1, 1000, vImgLink, `(*)Vui lòng nhập link ảnh`, `(*)Nhập từ 1 đến 1000 kí tự chữ và số`, `(*)Vui lòng nhập đúng định dạng`);
    isValidation &= validation.checkTring(descS, "errorMoTa", 1, 1000000, vStringAZNum_VN, `(*)Vui lòng nhập mô tả`, `(*)Nhập từ 1 đến 1000000 kí tự chữ và số`, `(*)Vui lòng nhập đúng định dạng`);
    isValidation &= validation.checkSelec(loaiSPindex, "errorLoai", `(*)Vui lòng chọn loại sản phẩm`);
    if (!isValidation) return;
    const device = new Device("", TenSP, GiaSP, screenSP, backCameraSP, frontCameraSP, HinhSP, descS, loaiSP);
    return device;
}
window.getInfoDevices = getInfoDevices
// tạo cấu trúc bản 
const addTable = data => {
    getId("tblDanhSachSP").innerHTML = "";
    if (data && data.length > 0) {
        const retult = data.reduce((content, item, index) => {
            return (content += `<tr>
            <td>${index + 1}</td>
            <td>${item.type}</td>
            <td>${item.name}</td>
            <td>${parseFloat(item.price).toLocaleString()}</td>
            <td><img src="${item.img}" alt="${item.type}" width="200px"></td>
            <td>Screen: ${item.screen}</br>Back camera: ${item.backCamera}</br> Front camera: ${item.frontCamera}</td>
            <td>${item.desc}</td></td>
            <td style="width:8.5rem">
            <button onclick="setDevices('${item.id}')" type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal">Sửa</button>
            <button onclick="deleteDevices('${item.id}')" type="button" class="btn btn-danger">Xóa</button>
            </td>
          </tr>`)
        }, "")
        getId("tblDanhSachSP").innerHTML = retult;

    }
}
// khởi tạo bản
const renderTable = () => {
    getId("loader").style.display = "block";
    deviceServices.callAPI(`product`, "GET", null)
        .then(retult => {
            if (retult.statusText === "OK") {
                getId("loader").style.display = "none";
                addTable(retult.data)
            }
        })
        .catch(error => {
            getId("loader").style.display = "none";
            console.log(error);
        })
}
renderTable();
getId("search").addEventListener("keyup", () => {
    let keyW = getId("search").value;
    if (keyW !== "") {
        getId("loader").style.display = "block";
        deviceServices.callAPI(`product`, "GET", null)
            .then((retult) => {
                getId("loader").style.display = "none";
                let searchDevice = retult.data.reduce((content, device) => {
                    let keyWTLC = keyW.toLowerCase();
                    let deviceNameTLC = device.name.toLowerCase();
                    if (deviceNameTLC.indexOf(keyWTLC) !== -1) {
                        content.push(device);
                    }
                    return content;
                },[])
                addTable(searchDevice)
            })
            .catch(error => {
                getId("loader").style.display = "none";
                console.log(error);
            })
            return;
    }
    renderTable();
})
// xóa dữ liệu 
const deleteDevices = (id) => {
    deviceServices.callAPI(`product/${id}`, "DELETE", null)
        .then(() => {
            getId("loader").style.display = "block";
            getId("loader").style.display = "none";
            renderTable()
        })
        .catch(error => console.log(error))
}
window.deleteDevices = deleteDevices;

getId("btnThemSP").addEventListener("click", () => {
    getId("titleAdd").innerHTML = "Thêm sản phẩm"
    getId("btnAdd").style.display = "block";
    getId("btnUpdate").style.display = "none";
})

// update data 
const setDevices = async (id) => {
    getId("titleAdd").innerHTML = "Sửa sản phẩm"
    getId("btnAdd").style.display = "none";
    getId("btnUpdate").style.display = "block";
    resetValidation("errorTen");
    resetValidation("errorGia");
    resetValidation("errorScreen");
    resetValidation("errorBackCamera");
    resetValidation("errorFrontCamera");
    resetValidation("errorHinh");
    resetValidation("errorMoTa");
    resetValidation("errorLoai");
    getId("loader").style.display = "block";
    await deviceServices.callAPI(`product/${id}`, "GET", null)
        .then((retult) => {
            if (retult.statusText === "OK") {
                getId("loader").style.display = "none";
                let data = retult.data
                getId("TenSP").value = data.name;
                getId("GiaSP").value = data.price;
                getId("screenSP").value = data.screen;
                getId("backCameraSP").value = data.backCamera;
                getId("frontCameraSP").value = data.frontCamera;
                getId("HinhSP").value = data.img;
                getId("descSP").value = data.desc;
                getId("loaiSP").value = data.type;
                getId("btnUpdate").onclick = () => {
                    const device = getInfoDevices()
                    if (device) {
                        getId("loader").style.display = "block";
                        deviceServices.callAPI(`product/${data.id}`, "PUT", device)
                            .then(() => {
                                getId("loader").style.display = "none";
                                renderTable()
                                getId("btnClose").click()
                            })
                            .catch(error => {
                                getId("loader").style.display = "none";
                                console.log(error);
                            })

                    }
                }
            }

        })
        .catch(error => {
            getId("loader").style.display = "none";
            console.log(error);
        })

}
window.setDevices = setDevices;


getId("btnAdd").addEventListener("click", () => {
    getId("titleAdd").innerHTML = "Thêm sản phẩm"
    getId("btnAdd").style.display = "block";
    getId("btnUpdate").style.display = "none";
    const device = getInfoDevices();
    if (device) {
        getId("loader").style.display = "block";
        deviceServices.callAPI(`product`, "POST", device)
            .then(() => {
                getId("loader").style.display = "none";
                renderTable();
                getId("btnClose").click();
            })
            .catch(error => {
                getId("loader").style.display = "none";
                console.log(error);
            })
    }
})

$('#modal1').on('hidden.bs.modal', function (e) {
    $(this)
        .find("input,textarea,select")
        .val('')
        .end()
        .find("input[type=checkbox], input[type=radio]")
        .prop("checked", "")
        .end();
})
