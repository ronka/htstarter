import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutPage = () => (
  <div className="min-h-screen bg-gray-50">
    <main className="max-w-2xl mx-auto px-4 py-12 space-y-8 ">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            🚀 אודות HighTechStarter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            HighTechStarter היא פלטפורמה קהילתית שמטרתה לחשוף, להעצים ולקדם
            פרויקטים טכנולוגיים ישראליים, יזמים ויוצרות. כאן תוכלו לגלות
            פרויקטים חדשניים, להצביע לזוכים יומיים, ולהתחבר עם יוצרים מוכשרים.
          </p>
          <p className="text-md text-gray-600 mb-2">
            הצטרפו אלינו, שתפו את הפרויקט שלכם, ותהיו חלק מקהילת החדשנות של
            ישראל!
          </p>
          <div className="flex gap-2 mt-4">
            <Link href="/submit" passHref>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                🚀 שלח פרויקט
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            👨‍💻 על היוצר: רון קנטור
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-lg">
              רון קנטור הוא מפתח תוכנה בגוגל, יזם, ומחבר הספר "המדריך להייטקיסט
              המתחיל". רון התחיל את דרכו כחייל קרבי, למד לתואר במדעי המחשב
              באוניברסיטה הפתוחה תוך כדי עבודה במשרה מלאה, ומאמין גדול בלמידה
              עצמית ובהתמדה.
            </p>
            <p className="text-md text-gray-600">
              "מטרתי היא להעניק השראה ותובנות מעשיות לכל מי שחולם על קריירה
              בעולם הטכנולוגיה."
              <br />
              מתוך{" "}
              <Link
                href="https://hightechguide.co.il/"
                className="underline text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                המדריך להייטקיסט המתחיל
              </Link>
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Link
                href="https://ronka.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="flex items-center gap-2">
                  🌐 האתר האישי של רון
                </Button>
              </Link>
              <Link
                href="https://hightechguide.co.il/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="flex items-center gap-2">
                  📚 המדריך להייטקיסט
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  </div>
);

export default AboutPage;
