import React from "react";
import { useLocation } from "react-router";
import "../css/reportViewer.scss";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface locF {
  myPdf: any;
}
const Report_Viewer: React.FC = () => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const location = useLocation<locF>();
  const pdfUrl = location.state?.myPdf;
  
  return (
    <></>

  );
};

export default Report_Viewer;
