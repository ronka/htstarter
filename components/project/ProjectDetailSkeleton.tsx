import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const ProjectDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Skeleton className="h-6 w-32 mb-6" />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <Skeleton className="w-full h-64 rounded-t-lg" />
              <CardContent className="p-6">
                <Skeleton className="h-8 w-3/4 mb-3" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-5/6 mb-4" />

                <div className="flex flex-wrap gap-2 mb-6 flex-row-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-6 w-16" />
                  ))}
                </div>

                <div className="flex gap-3 mb-6">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 flex-1" />
                </div>

                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-6 w-32 mb-3" />
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center">
                          <Skeleton className="w-2 h-2 rounded-full ml-3" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Skeleton className="h-6 w-32 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>

                  <div>
                    <Skeleton className="h-6 w-32 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 space-x-reverse p-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      <Skeleton className="w-12 h-12 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
