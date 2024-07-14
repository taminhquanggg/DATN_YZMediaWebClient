import moment from "moment";
import { toast } from "react-toastify";

var _countSpinLoading = 0; // Dem so lan func dc goi
export const SpinLoading = (create) => {
  const loader = document.querySelector("#Loader");
  create = create || false;
  if (create) {
    _countSpinLoading++;
    // loader.classList.remove("hide");
    // loader.classList.add("shown");

    loader.style.display = "block";
    loader.style.animation = "fadeIn 0.5s";
  } else {
    _countSpinLoading--;
    if (_countSpinLoading <= 0) {
      _countSpinLoading = 0;
      // loader.classList.remove("shown");
      // loader.classList.add("hide");
      loader.style.display = "none";
      loader.style.animation = "fadeOut 0.5s";
    }
  }
};

export const getFromToPaging = (pCurrentPage, pRecordOnPage) => {
  try {
    let fromRecord = pRecordOnPage * (pCurrentPage - 1) + 1;
    let pToRecord = pRecordOnPage * pCurrentPage;

    return { from: fromRecord, to: pToRecord };
  } catch (ex) {
    console.error(ex.toString());
    return { from: -1, to: -1 };
  }
};

export const ObjectValueToKeySearch = (values) => {
  var keySearch = "";
  var _lstValue = [];

  Object.keys(values).forEach((e) => {
    const dateFormat = "YYYY-MM-DD";
    var key = "";
    if (e.toUpperCase().includes("DATE")) {
      key = values[e] != undefined ? values[e].format(dateFormat) : "";
    } else if (e.toUpperCase().includes("RANGE")) {
      if (values[e] != undefined) {
        var dateRanges = values[e];
        let from =
          dateRanges[0] != undefined ? dateRanges[0].format(dateFormat) : "";
        let to =
          dateRanges[1] != undefined ? dateRanges[1].format(dateFormat) : "";

        key = from + "|" + to;
      } else {
        key = "|";
      }
    } else {
      key = values[e] != undefined ? values[e] : "";
    }
    _lstValue.push(key);
  });
  keySearch = _lstValue.join("|");
  return keySearch;
};

export function ValidatePhone(phoneNumber) {
  try {
    const phonePattern = /^[0-9]{10}$/; // For a basic 10-digit number validation

    return phonePattern.test(phoneNumber);
  } catch (error) {
    console.error(error);
  }
}

export function ValidateEmail(email) {
  try {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  } catch (error) {
    console.error(error);
  }
}

export function equalDateNow(date) {
  var dateNow = moment().startOf("day");
  var date = moment(date, "YYYY-MM-DD").startOf("day");
  console.log(dateNow.format("YYYY-MM-DD"), date.format("YYYY-MM-DD"), date);
  return dateNow.format("YYYY-MM-DD") == date.format("YYYY-MM-DD");
}

export const handleDownloadFile = (src, name) => {
  if (src && name) {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;

        link.download = name;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  } else {
    toast.error("Có lỗi sảy ra khi tải file");
  }
};

export const handleDownloadFileV2 = (ObjectURL, name) => {
  if (ObjectURL && name) {
    const link = document.createElement("a");
    link.href = ObjectURL;

    link.download = name;
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(ObjectURL);
    link.remove();
  } else {
    toast.error("Có lỗi xảy ra khi tải file");
  }
};

export function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function isBase64(str) {
  const base64Pattern =
    /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=)?$/i;
  return base64Pattern.test(str);
}
