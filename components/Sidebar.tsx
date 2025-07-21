import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

const RONKA_COURSE_ID = "819";
const RONKA_BOOK_PYSHICAL_ID = "704";
const RONKA_BOOK_DIGITAL_ID = "712";

const RonkaPhysicalBookButton = () => {
  return (
    <Button className="w-full bg-green-500" size={"lg"} asChild>
      <Link
        href={`https://ronka.dev/checkout/?custom-add-to-cart=${RONKA_BOOK_PYSHICAL_ID}&quantity=1&utm_source=htstarter&utm_medium=button&utm_campaign=physical_book&utm_content=physical_book_button`}
      >
        אני רוצה כזה! עותק פיזי 📚
      </Link>
    </Button>
  );
};

const RonkaCourseButton = () => {
  return (
    <Button className="w-full bg-blue-500" size={"lg"} asChild>
      <Link
        href={`https://ronka.dev/cart/?custom-add-to-cart=${RONKA_COURSE_ID}&quantity=1&utm_source=htstarter&utm_medium=button&utm_campaign=physical_book&utm_content=physical_book_button`}
      >
        התחל עכשיו ב-198 ₪ בלבד! 🚀
      </Link>
    </Button>
  );
};

const RonkaDigitalBookButton = () => {
  return (
    <Button className="w-full bg-sky-500" size={"lg"} asChild>
      <Link
        href={`https://ronka.dev/checkout/?custom-add-to-cart=${RONKA_BOOK_DIGITAL_ID}&quantity=1&utm_source=htstarter&utm_medium=button&utm_campaign=digital_book&utm_content=digital_book_button`}
      >
        אני רוצה כזה! עותק דיגיטלי 📱
      </Link>
    </Button>
  );
};

const RonkaBookSection = () => {
  return (
    <Card className="w-full rounded-lg shadow-lg">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src="/promo-pic.png"
          alt="Book Cover"
          className="aspect-[3/4] bg-gray-300 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <CardContent className="space-y-4 p-4 -mt-4">
        <div>
          <h3 className="text-lg font-bold">המדריך להייטקיסט המתחיל</h3>
          <p className="text-muted-foreground">
            כל מה שרציתם לדעת ולא העזתם לשאול על עולם ההייטק המורכב תוכלו למצוא
            בספר שבידיכם.
          </p>
        </div>
        <RonkaPhysicalBookButton />
        <RonkaDigitalBookButton />
      </CardContent>
    </Card>
  );
};

const RonkaCourseSection = () => {
  return (
    <Card className="w-full rounded-lg shadow-lg">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src="https://hightechguide.co.il/_next/image?url=%2Fcourse-assets%2Fcover.png&w=640&q=75"
          alt="Book Cover"
          className="aspect-[1/1] bg-gray-300 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <CardContent className="space-y-4 p-4 -mt-4">
        <div>
          <h3 className="text-lg font-bold">
            לעבור את ראיון העבודה הבא שלך בהצלחה
          </h3>
          <p className="text-muted-foreground">
            קורס דיגיטלי מקיף עם +25 שיעורים מעשיים, כשעתיים של וידאו, וליווי של
            מראיין בכיר.
          </p>
        </div>
        <RonkaCourseButton />
      </CardContent>
    </Card>
  );
};

const Sidebar = () => {
  return (
    <div className="space-y-6">
      <RonkaCourseSection />
      <RonkaBookSection />
    </div>
  );
};

export default Sidebar;
