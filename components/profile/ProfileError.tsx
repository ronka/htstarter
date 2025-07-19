import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

interface ProfileErrorProps {
  error: string;
}

const ProfileError = ({ error }: ProfileErrorProps) => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">משתמש לא נמצא</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link href="/">
          <Button>חזור לדף הבית</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileError;
