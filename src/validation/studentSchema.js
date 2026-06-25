import * as Yup from "yup";
export const studentSchema = Yup.object({
    maSV: Yup.string().trim().required("Mã SV không được để trống"),
    hoTen: Yup.string()
        .trim()
        .required("Họ tên không được để trống")
        .matches(
            /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
            "Họ tên chỉ được chứa chữ cái, không có số hay ký tự đặc biệt",
        )
        .min(2, "Họ tên phải có ít nhất 2 ký tự")
        .max(50, "Họ tên không được vượt quá 50 ký tự"),

    soDienThoai: Yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^0\d{9}$/, "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0"),

    email: Yup.string()
        .required("Email không được để trống")
        .email("Email không đúng định dạng (vd: abc@gmail.com)"),
});