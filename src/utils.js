export function downloadFile(
  contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  data,
  filename
) {
  // Convert the buffer data to a Blob
  const blob = new Blob([data], {
    type: contentType,
  });

  // Save the Blob as a file using FileSaver.js
  saveAs(blob, filename);
}
