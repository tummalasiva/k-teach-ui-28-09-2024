/** @format */

import { toast } from "react-toastify";
import { saveAs } from "file-saver";

export function downloadFile(
  contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  data,
  filename,
  open = true
) {
  // Convert the buffer data to a Blob
  const blob = new Blob([data], {
    type: contentType,
  });

  // Save the Blob as a file using FileSaver.js
  saveAs(blob, filename);

  if (open && contentType === "application/pdf") {
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");

    // Revoke the URL after some time to free up memory
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1000);
  }
}

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
