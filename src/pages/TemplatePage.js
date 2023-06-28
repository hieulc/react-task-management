import AdminBoard from "../components/AdminBoard";
import { AdminProvider } from "../context/admin";

function TemplatePage() {
  return (
    <AdminProvider>
      <AdminBoard />
    </AdminProvider>
  );
}

export default TemplatePage;
