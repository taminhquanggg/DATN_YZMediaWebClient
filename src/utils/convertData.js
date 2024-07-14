import { format } from "date-fns";

export const formatDate = (dateTimeString, formatString) => {
  try {
    if (dateTimeString?.includes("0001-01-01")) {
      return "";
    }
    return format(new Date(dateTimeString), formatString) ?? "";
  } catch (e) {
    return "";
  }
};

export const PriceFormatter = (params) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    params.value || 0
  );
};

export const formatNumber = (numberValue) => {
  if (isNaN(numberValue) === true || numberValue === undefined || numberValue === null) {
    return "";
  }
  var num = numberValue.toString().replace(/[^0-9]/g, "");
  return (numberValue = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
};

export const formatNumberVND = (numberValue) => {
  if (isNaN(numberValue) === true || numberValue === undefined || numberValue === null) {
    return "";
  }
  var num = numberValue.toString().replace(/[^0-9]/g, "");
  return (numberValue = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + "đ";
};

export const formatNumberV2 = (number) => {
  if (isNaN(number) === true || number === undefined || number === null) {
    return "";
  }
  // Tách phần nguyên và phần thập phân
  const parts = number.toString().split(".");
  const integerPart = parts[0];
  let decimalPart = parts[1] || ""; // Nếu không có phần thập phân, mặc định là chuỗi rỗng

  // Định dạng phần nguyên
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Định dạng phần thập phân nếu có
  if (decimalPart.length > 0) {
    decimalPart = `.${decimalPart}`;
  }

  return `${formattedInteger}${decimalPart}`;
};

export const convertToArray = (arr) => {
  return Array.isArray(arr) ? arr : [];
};

export const dateToString = (date) => {
  var d = (date.getDate() < 10 ? "0" : "") + date.getDate();
  var m = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  var hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
  var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  return `${date.getFullYear()}-${m}-${d} ${hour}:${minutes}`;
};

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

