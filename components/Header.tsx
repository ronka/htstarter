import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DH</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DevHunt</h1>
              <p className="text-xs text-gray-500 -mt-1">
                גלה פרויקטים מדהימים
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              פרויקטים
            </Link>
            <Link
              href="/makers"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              יוצרים
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              אודות
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              התחבר
            </Button>
            <Link href="/submit">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                שלח פרויקט
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
