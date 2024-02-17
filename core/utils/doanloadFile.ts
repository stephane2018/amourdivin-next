interface DownloadFileProps {
  url: string;
  fileName?: string;
}
// async function downloadFile({
//   url,
//   fileName = "download.file",
//   onProgress = () => {},
//   onError = () => {},
//   onSuccess = () => {},
// }: DownloadFileProps) {
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const reader = response?.body.getReader();
//     let totalBytesReceived = 0;
//     const totalBytesExpected = response.headers.get("Content-Length");

//     while (true) {
//       const { done, value } = await reader.read();

//       if (done) {
//         break;
//       }

//       totalBytesReceived += value.length;
//       const currentProgress = totalBytesExpected
//         ? Math.round((totalBytesReceived / totalBytesExpected) * 100)
//         : undefined;
//       setProgress(currentProgress);

//       // Update your download UI with `progress` and `totalBytesExpected`
//     }

//     const blob = await response.blob();
//     const blobUrl = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = blobUrl;
//     link.download = filename || "download.file"; // Set default filename if not provided
//     link.click();

//     URL.revokeObjectURL(blobUrl);
//   } catch (error) {
//     console.error("Error downloading file:", error);
//     // Handle download error gracefully (e.g., display an error message)
//   } finally {
//     setIsDownloading(false);
//   }
// }

export async function handleDownloadFile({
  url,
  fileName = "download.file",
}: DownloadFileProps) {
  const link = url;

  try {
    const response = await fetch(link);
    const totalBytes = Number(response.headers.get("Content-Length"));
    let downloadedBytes = 0;

    const reader = response.body?.getReader();

    if (!reader) {
      throw new Error("Response body is undefined");
    }

    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      if (value) {
        chunks.push(value);
        downloadedBytes += value.length;
        const calculatedProgress = Math.round(
          (downloadedBytes / totalBytes) * 100
        );
      }
    }

    const blob = new Blob(chunks);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error occurred during file download:", error);
  }
}

export default handleDownloadFile;
