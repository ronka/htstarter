import { Loader2 } from "lucide-react";
import Header from "@/components/Header";

const ProfileLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p>Loading profile...</p>
      </div>
    </div>
  );
};

export default ProfileLoading;
