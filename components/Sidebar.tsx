import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Sidebar = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">הפופולריים השבוע</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">
            אין עדיין פרויקטים פופולריים השבוע.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">קטגוריות מובילות השבוע</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">אין קטגוריות פעילות השבוע.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
