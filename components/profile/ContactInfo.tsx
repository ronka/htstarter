import { Card } from "@/components/ui/card";

interface ContactInfoProps {
  website: string;
  twitter: string;
  github: string;
}

const ContactInfo = ({ website, twitter, github }: ContactInfoProps) => {
  return (
    <Card className="p-6 mt-6">
      <h3 className="font-semibold text-lg mb-4">פרטי קשר</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium flex-shrink-0">אתר:</span>
          <a
            href={website}
            className="text-blue-600 hover:underline truncate block"
            target="_blank"
            rel="noopener noreferrer"
            title={website}
          >
            {website}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium flex-shrink-0">טוויטר:</span>
          <span className="text-gray-600 truncate block" title={twitter}>
            {twitter}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium flex-shrink-0">גיטהאב:</span>
          <span className="text-gray-600 truncate block" title={github}>
            {github}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ContactInfo;
