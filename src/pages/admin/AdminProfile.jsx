import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export const AdminProfile = () => {
  const [adminProfile, isLoading] = useFetch('/admin/profile'); // Fetch admin profile data from API
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (adminProfile) {
      setProfile(adminProfile);
    }
  }, [adminProfile]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Profile</h1>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={profile.profilePic || "https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="}
            alt="Admin Profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-gray-300"
          />
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <strong className="text-xl">Name:</strong>
            <p className="text-lg">{profile.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <strong className="text-xl">Email:</strong>
            <p className="text-lg">{profile.email}</p>
          </div>
          <div className="flex justify-between items-center">
            <strong className="text-xl">Role:</strong>
            <p className="text-lg">{profile.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
