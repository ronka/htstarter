import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";

const ProfileLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-center">
                {/* Avatar skeleton */}
                <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />

                {/* Name skeleton */}
                <Skeleton className="h-8 w-48 mx-auto mb-2" />

                {/* Experience skeleton */}
                <Skeleton className="h-5 w-32 mx-auto mb-2" />

                {/* Location skeleton */}
                <Skeleton className="h-4 w-24 mx-auto mb-4" />

                {/* Stats skeleton */}
                <div className="flex justify-center gap-4 mb-6">
                  <div className="text-center">
                    <Skeleton className="h-6 w-8 mx-auto mb-1" />
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-6 w-8 mx-auto mb-1" />
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-6 w-8 mx-auto mb-1" />
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </div>
                </div>

                {/* Buttons skeleton */}
                <div className="flex justify-center gap-2 mb-4">
                  <Skeleton className="h-9 w-16" />
                  <Skeleton className="h-9 w-24" />
                </div>

                {/* Edit profile button skeleton */}
                <div className="mb-6">
                  <Skeleton className="h-9 w-full" />
                </div>

                {/* Bio skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>

            {/* Skills Section Skeleton */}
            <div className="bg-white rounded-lg p-6 mt-6 shadow-sm">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-6 w-18" />
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </div>

          {/* Projects Section Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Skeleton className="h-7 w-32 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Project 1 */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-6 w-32" />
                    <div className="flex items-center gap-1">
                      <Skeleton className="w-4 h-4" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-14" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>

                {/* Project 2 */}
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-6 w-28" />
                    <div className="flex items-center gap-1">
                      <Skeleton className="w-4 h-4" />
                      <Skeleton className="h-4 w-6" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Skeleton className="h-5 w-14" />
                    <Skeleton className="h-5 w-18" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;
