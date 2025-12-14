import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const UserProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

      <div className="card bg-base-100 shadow-md max-w-2xl">
        <div className="card-body items-center text-center">

          {/* Profile Image */}
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt="Profile"
              />
            </div>
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold mt-4">
            {user?.displayName || "No Name Found"}
          </h3>

          {/* Email */}
          <p className="text-base-content opacity-80">
            {user?.email}
          </p>

          {/* Role */}
          <div className="mt-3">
            <span className="badge badge-primary badge-lg capitalize">
              {role}
            </span>
          </div>

          {/* Extra Info */}
          <div className="divider"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
            <p>
              <span className="font-semibold">Account Created:</span>{" "}
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              <span className="font-semibold">Last Login:</span>{" "}
              {user?.metadata?.lastSignInTime
                ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              <span className="font-semibold">Email Verified:</span>{" "}
              {user?.emailVerified ? "Yes" : "No"}
            </p>

            <p>
              <span className="font-semibold">UID:</span>{" "}
              {user?.uid}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
