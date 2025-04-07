
import { Navigate } from "react-router-dom";

const Index = () => {
  // This page is no longer needed as we're using Layout with HomePage
  return <Navigate to="/" replace />;
};

export default Index;
