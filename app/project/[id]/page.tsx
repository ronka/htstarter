"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useProject } from "@/hooks/use-project";
import { useVote } from "@/hooks/use-vote";
import { useVoteStats } from "@/hooks/use-vote-stats";
import {
  ProjectDetailSkeleton,
  ProjectError,
  ProjectHeader,
  ProjectMain,
  ProjectSidebar,
} from "@/components/project";

interface ProjectDetailClientProps {
  id: string;
}

const ProjectDetailClient = ({ id }: ProjectDetailClientProps) => {
  const { data: project, isLoading, error } = useProject(id);
  const { data: voteStats, isLoading: isVoteStatsLoading } = useVoteStats({
    projectId: parseInt(id),
    enabled: !!project,
  });

  const {
    toggleVote,
    hasVoted,
    dailyVotes,
    totalVotes,
    isLoading: isVoting,
  } = useVote({
    projectId: parseInt(id),
    initialDailyVotes: voteStats?.dailyVotes || 0,
    initialTotalVotes: voteStats?.totalVotes || 0,
    initialHasVoted: voteStats?.hasVoted || false,
  });

  const handleVote = () => {
    if (!project) return;
    toggleVote();
  };

  if (isLoading || isVoteStatsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProjectDetailSkeleton />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProjectError error={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ProjectHeader />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ProjectMain
              image={project.image}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              dailyVotes={dailyVotes}
              totalVotes={totalVotes}
              hasVoted={hasVoted}
              onVote={handleVote}
              isVoting={isVoting}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              features={project.features}
              techDetails={project.techDetails}
              challenges={project.challenges}
              authorId={project.author.id}
              projectId={project.id.toString()}
            />
          </div>

          <ProjectSidebar
            author={project.author}
            dailyVotes={dailyVotes}
            totalVotes={totalVotes}
            hasVoted={hasVoted}
            onVote={handleVote}
            isVoting={isVoting}
            category={project.category}
            technologiesCount={project.technologies.length}
          />
        </div>
      </div>
    </div>
  );
};

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return <ProjectDetailClient id={id} />;
}
