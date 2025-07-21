import { X, ArrowUp, ArrowDown } from "lucide-react";
import React from "react";
import { Experience } from "@/components/profile/AddExperienceForm";

type ExperienceTimelineProps = {
  experiences: Experience[];
  onRemove?: (index: number) => void;
  showRemove?: boolean;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  showReorder?: boolean;
};

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

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  onRemove,
  showRemove = false,
  onMoveUp,
  onMoveDown,
  showReorder = false,
}) => {
  if (!experiences || experiences.length === 0) return null;
  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        {experiences.map((exp, index) => (
          <div key={index} className="relative pr-12 pb-6">
            {/* Timeline dot */}
            <div className="absolute right-2 top-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                <div className="flex gap-1 items-center">
                  {showReorder && (
                    <>
                      {onMoveUp && index > 0 && (
                        <button
                          type="button"
                          onClick={() => onMoveUp(index)}
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          aria-label="העבר מעלה"
                          tabIndex={0}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                      )}
                      {onMoveDown && index < experiences.length - 1 && (
                        <button
                          type="button"
                          onClick={() => onMoveDown(index)}
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                          aria-label="העבר מטה"
                          tabIndex={0}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                  {showRemove && onRemove && (
                    <button
                      type="button"
                      onClick={() => onRemove(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="הסר ניסיון"
                      tabIndex={0}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-blue-600 text-sm mb-1">{exp.company}</p>
              <p className="text-gray-500 text-sm mb-2">
                {formatExperienceDuration(exp)}
              </p>
              <p className="text-gray-700 text-sm">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
