import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
      <div className="flex items-center justify-center p-6 sm:p-12 mt-20">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
  );
}