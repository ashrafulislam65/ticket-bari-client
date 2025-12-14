import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const AdminProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Profile</h2>

      <div className="card bg-base-200 shadow-md max-w-xl">
        <div className="card-body items-center text-center">

          {/* Profile Image */}
          <div className="avatar mb-4">
            <div className="w-28 rounded-full ring ring-error ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt="Admin Avatar"
              />
            </div>
          </div>

          {/* Admin Info */}
          <h3 className="text-xl font-semibold">
            {user?.displayName || "Admin Name"}
          </h3>

          <p className="text-sm opacity-70">{user?.email}</p>

          <div className="badge badge-error mt-2 capitalize">
            {role}
          </div>

          <div className="divider"></div>

          {/* Extra Info */}
          <div className="text-left w-full space-y-2">
            <p>
              <span className="font-semibold">Account Type:</span>{" "}
              Administrator
            </p>
            <p>
              <span className="font-semibold">Email Verified:</span>{" "}
              {user?.emailVerified ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Admin UID:</span>{" "}
              {user?.uid}
            </p>
            <p>
              <span className="font-semibold">Access Level:</span>{" "}
              Full System Access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
