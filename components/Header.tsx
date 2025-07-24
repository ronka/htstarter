"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const Header = () => {
  const { userId } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span role="img" aria-label="Rocket" className="text-2xl">
                🚀
              </span>
              <div>
                <h1 className="text-xl font-bold" style={{ color: "#22408e" }}>
                  HighTechShip
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  גלה פרויקטים מדהימים
                </p>
              </div>
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
              href="/search"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              חיפוש
            </Link>
            <Link
              href="/daily-winners"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              זוכים יומיים
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              אודות
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm" className="hidden md:flex">
                  התחבר
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              {userId && (
                <Link
                  href={`/profile/${userId}/edit`}
                  className="hidden md:block"
                >
                  <Button variant="outline" size="sm">
                    הפרופיל שלי
                  </Button>
                </Link>
              )}
              <SignOutButton>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  התנתק
                </Button>
              </SignOutButton>
            </SignedIn>
            <Link href="/submit" className="hidden md:block">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                שלח פרויקט
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="flex flex-col py-4 space-y-2">
              <Link
                href="/"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                פרויקטים
              </Link>
              <Link
                href="/search"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                חיפוש
              </Link>
              <Link
                href="/daily-winners"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                זוכים יומיים
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                אודות
              </Link>
              <div className="border-t pt-2 mt-2">
                <SignedOut>
                  <SignInButton>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-center"
                    >
                      התחבר
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  {userId && (
                    <Link href={`/profile/${userId}/edit`} className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-center mb-2"
                      >
                        הפרופיל שלי
                      </Button>
                    </Link>
                  )}
                  <SignOutButton>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-center mb-2"
                    >
                      התנתק
                    </Button>
                  </SignOutButton>
                  <Link href="/submit" className="block">
                    <Button
                      size="sm"
                      className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      שלח פרויקט
                    </Button>
                  </Link>
                </SignedIn>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
