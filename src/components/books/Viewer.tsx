import React, { useRef } from "react";

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  return (
    <div className="flex flex-col h-[700px] md:h-full w-full">
      {/* Iframe para mostrar el PDF */}
      <div className="flex-1 overflow-auto">
        <iframe
          ref={iframeRef}
          src={pdfUrl}
          className="w-full h-full border-none"
          style={{ overflow: "hidden" }}
          title="PDF Viewer"
        />
      </div>
    </div>
  );
};

export default PdfViewer;
