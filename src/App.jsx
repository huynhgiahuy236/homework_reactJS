import { useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SEED } from "./data/MockStudent";
import { studentSchema } from "./validation/studentSchema";
import InputField from "./components/InputField";
import EditModal from "./components/EditModal";

export default function App() {
  const [students, setStudents] = useState(SEED);
  const [nextId, setNextId] = useState(4);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  // ── helpers ──
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  // ── JS filter ──
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.maSV.toLowerCase().includes(q) ||
        s.hoTen.toLowerCase().includes(q) ||
        s.soDienThoai.includes(q) ||
        s.email.toLowerCase().includes(q),
    );
  }, [students, search]);

  // ── delete ──
  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast("Đã xóa sinh viên", "error");
  };

  // ── save edit ──
  const handleSaveEdit = (updated) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setEditing(null);
    showToast("Cập nhật thành công");
  };

  // ── Formik add ──
  const formik = useFormik({
    initialValues: { maSV: "", hoTen: "", soDienThoai: "", email: "" },
    validationSchema: studentSchema.concat(
      Yup.object({
        maSV: Yup.string()
          .trim()
          .required("Mã SV không được để trống")
          .test(
            "unique",
            "Mã SV này đã tồn tại trong danh sách",
            (val) => !students.some((s) => s.maSV === val?.trim()),
          ),
      }),
    ),
    onSubmit: (values, { resetForm }) => {
      setStudents((prev) => [...prev, { id: nextId, ...values }]);
      setNextId((n) => n + 1);
      resetForm();
      showToast("Thêm sinh viên thành công");
    },
  });

  return (
    <div className="min-h-screen bg-[#F5F0E8] p-8 font-sans">
      {/* Toast */}
      {toast && (
        <div
          className={[
            "fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg transition-all",
            toast.type === "error"
              ? "bg-[#A32D2D] text-white"
              : "bg-[#3B6D11] text-white",
          ].join(" ")}
        >
          {toast.type === "error" ? "✕" : "✓"} {toast.msg}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <EditModal
          student={editing}
          allStudents={students}
          onSave={handleSaveEdit}
          onClose={() => setEditing(null)}
        />
      )}

      <div className="max-w-[80%] mx-auto bg-white rounded-2xl border border-[#D4C9B5]/50 shadow-[0_2px_16px_rgba(26,22,18,0.07)] overflow-hidden">
        {/* Header */}
        <div className="bg-[#8B3A3A] px-7 py-[18px] flex items-center justify-between">
          <p className="text-[#F5F0E8] text-[15px] font-medium tracking-[0.04em]">
            Thông tin sinh viên
          </p>
          <span className="text-[#F5F0E8] text-xs tracking-[0.06em] uppercase">
            {students.length} sinh viên
          </span>
        </div>

        {/* Form */}
        <div className="p-7 flex flex-col  gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Mã SV"
              name="maSV"
              formik={formik}
              placeholder="22690491"
            />
            <InputField
              label="Họ tên"
              name="hoTen"
              formik={formik}
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Số điện thoại"
              name="soDienThoai"
              formik={formik}
              placeholder="0938123456"
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              formik={formik}
              placeholder="abc@gmail.com"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={formik.handleSubmit}
              className="h-12 px-6 bg-[#8B3A3A] hover:bg-[#C4736A] text-[#F5F0E8] text-xs font-medium tracking-[0.08em] uppercase rounded-xl transition-colors duration-150 cursor-pointer"
            >
              + Thêm sinh viên
            </button>
            {Object.keys(formik.errors).length > 0 &&
              formik.submitCount > 0 && (
                <span className="text-[11px] text-[#A32D2D]">
                  Còn {Object.keys(formik.errors).length} lỗi cần sửa
                </span>
              )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-7 h-px bg-[#EAE4D8] " />

        {/* Search */}
        <div className="px-7 py-4 flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69E92] text-sm">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo mã SV, họ tên, SĐT, email..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#D4C9B5] text-sm text-[#1A1612] placeholder:text-[#A69E92] outline-none focus:border-2 focus:border-[#8B3A3A] transition-all"
            />
          </div>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs text-[#7A6E60] hover:text-[#1A1612] underline cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          )}
          {search && (
            <span className="text-xs text-[#7A6E60]">
              {filtered.length} kết quả
            </span>
          )}
        </div>

        {/* Table */}
        <div className="px-7 pb-7 overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Mã SV", "Họ tên", "Số điện thoại", "Email", "Thao tác"].map(
                  (h) => (
                    <th
                      key={h}
                      className="bg-[#8B3A3A] text-[#F5F0E8] text-[11px] font-medium tracking-[0.06em] uppercase px-4 py-3 text-left"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr
                  key={s.id}
                  className={[
                    "transition-colors",
                    i % 2 === 0 ? "bg-white" : "bg-[#F5F0E8]",
                    "hover:bg-[#FAF0EE]",
                  ].join(" ")}
                >
                  <td className="text-[13px] font-medium text-[#1A1612] px-4 py-[14px] border-b border-[#EAE4D8]">
                    {s.maSV}
                  </td>
                  <td className="text-[13px] text-[#3D3530] px-4 py-[14px] border-b border-[#EAE4D8]">
                    {s.hoTen}
                  </td>
                  <td className="text-[13px] text-[#3D3530] px-4 py-[14px] border-b border-[#EAE4D8]">
                    {s.soDienThoai}
                  </td>
                  <td className="text-[13px] text-[#3D3530] px-4 py-[14px] border-b border-[#EAE4D8]">
                    {s.email}
                  </td>
                  <td className="px-4 py-[14px] border-b border-[#EAE4D8]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditing(s)}
                        className="text-[11px] font-medium tracking-[0.04em] px-5 py-1.5 rounded-lg border border-[#8B3A3A] text-[#8B3A3A] hover:bg-[#8B3A3A] hover:text-[#F5F0E8] transition-colors cursor-pointer"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-[11px] font-medium tracking-[0.04em] px-5 py-1.5 rounded-lg border border-[#A32D2D] text-[#A32D2D] hover:bg-[#A32D2D] hover:text-white transition-colors cursor-pointer"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-[#A69E92] text-sm py-10"
                  >
                    {search
                      ? `Không tìm thấy kết quả cho "${search}"`
                      : "Chưa có sinh viên nào"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
