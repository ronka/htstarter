import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

interface ProfileErrorProps {
  error: string;
}

const ProfileError = ({ error }: ProfileErrorProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileError;
