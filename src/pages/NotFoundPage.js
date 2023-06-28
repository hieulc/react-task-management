import { Navigate } from "react-router-dom";

function NotFoundPage() {
  return <Navigate to="/boards" />;
}

export default NotFoundPage;
