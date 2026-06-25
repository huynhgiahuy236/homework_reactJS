import React from "react";
import { studentSchema } from "../validation/studentSchema";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputField from "./InputField";
export default function EditModal({ student, onSave, onClose, allStudents }) {
  const editSchema = studentSchema.concat(
    Yup.object({
      maSV: Yup.string()
        .trim()
        .required("Mã SV không được để trống")
        .test(
          "unique-edit",
          "Mã SV đã tồn tại",
          (val) =>
            !allStudents.some(
              (s) => s.maSV === val?.trim() && s.id !== student.id,
            ),
        ),
    }),
  );

  const formik = useFormik({
    initialValues: {
      maSV: student.maSV,
      hoTen: student.hoTen,
      soDienThoai: student.soDienThoai,
      email: student.email,
    },
    validationSchema: editSchema,
    onSubmit: (values) => {
      onSave({ ...student, ...values });
    },
  });

  return (
    <div className="fixed inset-0 bg-[#1A1612]/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
        <div className="bg-[#1A1612] px-7 py-[18px] flex justify-between items-center">
          <p className="text-[#F5F0E8] text-[15px] font-medium tracking-[0.04em]">
            Chỉnh sửa sinh viên
          </p>
          <button
            onClick={onClose}
            className="text-[#A69E92] hover:text-[#F5F0E8] text-xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>
        <div className="p-7 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className=" opacity-50">
              <InputField
                label="Mã SV - Không thể sửa"
                name="maSV"
                formik={formik}
                placeholder="22690001"
                disabled={true}
              />
            </div>
            <InputField
              label="Họ tên"
              name="hoTen"
              formik={formik}
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Số điện thoại"
              name="soDienThoai"
              formik={formik}
              placeholder="0938111111"
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              formik={formik}
              placeholder="abc@gmail.com"
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button
              onClick={formik.handleSubmit}
              className="h-11 px-6 bg-[#8B3A3A] hover:bg-[#C4736A] text-[#F5F0E8] text-xs font-medium tracking-[0.08em] uppercase rounded-xl transition-colors cursor-pointer"
            >
              Lưu thay đổi
            </button>
            <button
              onClick={onClose}
              className="h-11 px-6 border border-[#D4C9B5] text-[#5A5248] text-xs font-medium tracking-[0.08em] uppercase rounded-xl hover:bg-[#F5F0E8] transition-colors cursor-pointer"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
