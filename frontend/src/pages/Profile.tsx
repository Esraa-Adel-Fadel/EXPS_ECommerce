import { useEffect, useState } from "react";
import { User, Mail, Shield, Calendar, Loader2 } from "lucide-react";
import { userService } from "../api/userService"; 

interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
}

export const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const userData = await userService.getUserProfile();
        setProfile(userData);
      } catch (err: any) {
        console.error("Failed to load profile:", err);
        setError(err.response?.data?.message || "Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-2 text-stone-600">
        <Loader2 className="h-6 w-6 animate-spin text-[#df5612]" />
        <span>Loading profile data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#df5612] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#c94d0f]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-[#F7F3ED] py-12 px-6">
      <div className="mx-auto max-w-xl bg-white p-8 shadow-sm border border-stone-200/60">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 border-b border-stone-200 pb-6 mb-6">
          <div className="flex h-16 w-16 items-center justify-center bg-[#df5612]/10 text-[#df5612]">
            <User className="h-8 w-8" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-semibold text-stone-800">
              {profile?.name || "User Profile"}
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#df5612] font-medium mt-0.5">
              {profile?.role || "USER"}
            </p>
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3.5 bg-stone-50 border border-stone-100">
            <Mail className="h-5 w-5 text-stone-500" />
            <div>
              <p className="text-xs text-stone-400 font-medium uppercase">Email Address</p>
              <p className="text-sm font-medium text-stone-800">{profile?.email || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 bg-stone-50 border border-stone-100">
            <Shield className="h-5 w-5 text-stone-500" />
            <div>
              <p className="text-xs text-stone-400 font-medium uppercase">Account Role</p>
              <p className="text-sm font-medium text-stone-800">{profile?.role || "USER"}</p>
            </div>
          </div>

          {profile?.createdAt && (
            <div className="flex items-center gap-3 p-3.5 bg-stone-50 border border-stone-100">
              <Calendar className="h-5 w-5 text-stone-500" />
              <div>
                <p className="text-xs text-stone-400 font-medium uppercase">Joined Date</p>
                <p className="text-sm font-medium text-stone-800">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};