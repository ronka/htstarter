import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const NewUserProfileAlert = () => (
  <Alert
    className="bg-blue-50 border-blue-200 text-blue-900"
    role="alert"
    tabIndex={0}
    aria-label="הודעת ברוך הבא למשתמש חדש"
  >
    <div className="max-w-4xl mx-auto px-4">
      <AlertTitle className="flex items-center gap-2 text-xl font-bold">
        <span aria-hidden="true">🎉</span>
        ברוך הבא!
      </AlertTitle>
      <AlertDescription className="flex items-center gap-2 mt-2 text-base font-semibold">
        <span aria-hidden="true">📝</span>
        כדי להגיש פרויקט, חובה להשלים את הפרופיל שלך
        <span aria-hidden="true">🚀</span>
      </AlertDescription>
    </div>
  </Alert>
);

export default NewUserProfileAlert;
