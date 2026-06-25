import React from "react";

export default function InputField({
  label,
  name,
  formik,
  placeholder,
  type = "text",
  disabled,
}) {
  const touched = formik.touched[name];
  const error = formik.errors[name];
  const hasErr = touched && error;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium tracking-[0.06em] uppercase text-[#7A6E60]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={[
          "h-[52px] rounded-xl px-4 text-sm text-[#1A1612] bg-white w-full outline-none transition-all duration-150 placeholder:text-[#A69E92]",
          hasErr
            ? "border border-[#A32D2D]"
            : touched
              ? "border border-[#3B6D11]"
              : "border border-[#D4C9B5] focus:border-2 focus:border-[#8B3A3A]",
        ].join(" ")}
      />
      {hasErr && (
        <span className="flex items-start gap-1 text-[11px] text-[#A32D2D] tracking-[0.02em] leading-snug">
          <span className="mt-px"></span> {error}
        </span>
      )}
      {touched && !error && (
        <span className="text-[11px] text-[#3B6D11]">Hợp lệ</span>
      )}
    </div>
  );
}
