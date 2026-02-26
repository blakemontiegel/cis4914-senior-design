import React, { useEffect, useRef } from "react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import Dashboard from "@uppy/dashboard";
import "@uppy/core/css/style.min.css";
import "@uppy/dashboard/css/style.min.css";

export default function VideoUploader() {
  const containerRef = useRef(null);
  const uppyRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const uppy = new Uppy({
      id: "video-uploader",
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: [".mp4", ".mov"],
      },
      autoProceed: false,
    });

    uppyRef.current = uppy;

    uppy.use(XHRUpload, {
      endpoint: "http://localhost:5000/videos/",
      fieldName: "files",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    uppy.use(Dashboard, {
      inline: true,
      target: containerRef.current,
      height: 450,
      showProgressDetails: true,
      note: "Accepted file types: mp4, mov",
      proudlyDisplayPoweredByUppy: false,
      showLinkToFileUploadResult: false,
      showRemoveButtonAfterComplete: false,
      theme: "dark",
    });

    const successHandler = (file, response) => {
      console.log("File uploaded successfully:", file.name);
      console.log("Server response:", response);
    };

    const errorHandler = (file, error) => {
      console.error("Error uploading file:", file.name);
      console.error("Error details:", error);
    };

    const completeHandler = (result) => {
      console.log("Upload complete! Files:", result.successful);
    };

    uppy.on("upload-success", successHandler);
    uppy.on("upload-error", errorHandler);
    uppy.on("complete", completeHandler);

  return () => {
    uppy.off("upload-success", successHandler);
    uppy.off("upload-error", errorHandler);
    uppy.off("complete", completeHandler);

    uppy.destroy();
  };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <div ref={containerRef} />
    </div>
  );
}
