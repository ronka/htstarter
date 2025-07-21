import { Card } from "@/components/ui/card";
import { Experience } from "@/types/profile";

interface ExperienceSectionProps {
  experience?: string;
}

const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
  const formatExperienceDuration = (exp: Experience) => {
    const startDate = `${exp.startMonth} ${exp.startYear}`;
    if (exp.isCurrentlyWorking) {
      return `${startDate} - הווה`;
    }
    if (exp.endMonth && exp.endYear) {
      return `${startDate} - ${exp.endMonth} ${exp.endYear}`;
    }
    return startDate;
  };

  const renderExperience = () => {
    try {
      const parsedExperience =
        experience && experience.trim() ? JSON.parse(experience) : null;
      let experienceData: Experience[] = [];
      let userTitle = "";

      if (parsedExperience) {
        if (Array.isArray(parsedExperience)) {
          // Old format - direct array
          experienceData = parsedExperience;
        } else if (parsedExperience.experiences) {
          // New format - object with title and experiences
          experienceData = parsedExperience.experiences;
          userTitle = parsedExperience.title || "";
        }
      }

      if (experienceData.length > 0) {
        return (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            {experienceData.map((exp, index) => (
              <div key={index} className="relative pr-12 pb-6">
                {/* Timeline dot */}
                <div className="absolute right-2 top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {exp.title}
                  </h4>
                  <p className="text-blue-600 text-sm mb-1">{exp.company}</p>
                  <p className="text-gray-500 text-sm mb-2">
                    {formatExperienceDuration(exp)}
                  </p>
                  <p className="text-gray-700 text-sm">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div className="text-center py-8 text-gray-500">
            <p>אין ניסיון עבודה נוסף עדיין.</p>
          </div>
        );
      }
    } catch (error) {
      // Fallback to display experience as text if JSON parsing fails
      return (
        <div className="border-l-2 border-blue-200 pl-4">
          <h3 className="font-semibold text-lg">{experience}</h3>
          <p className="text-gray-600">פרטי ניסיון</p>
        </div>
      );
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-6">ניסיון</h2>
      <div className="space-y-6">{renderExperience()}</div>
    </Card>
  );
};

export default ExperienceSection;
