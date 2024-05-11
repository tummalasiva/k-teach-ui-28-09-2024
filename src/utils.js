import { toast } from "react-toastify";

// export function downloadFile(
//   contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   data,
//   filename
// ) {
//   // Convert the buffer data to a Blob
//   const blob = new Blob([data], {
//     type: contentType,
//   });

//   // Save the Blob as a file using FileSaver.js
//   saveAs(blob, filename);
// }

export function hasAllValues(obj, exceptions = [], showToast = true) {
  let allValuesPresent = true;
  for (const key in obj) {
    if (!exceptions.includes(key) && !obj[key]) {
      allValuesPresent = false;
      if (showToast) {
        toast.error(`Value for "${key}" is missing!`);
      }
    }
  }
  return allValuesPresent;
}
