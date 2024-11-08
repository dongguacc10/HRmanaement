import { InterviewDetailContent } from './InterviewDetailContent';

interface InterviewDetailDrawerProps {
  interviewId: string;
  onClose: () => void;
  onViewCandidate?: (candidateId: string) => void;
}

export function InterviewDetailDrawer({ interviewId, onClose, onViewCandidate }: InterviewDetailDrawerProps) {
  return (
    <InterviewDetailContent
      interviewId={interviewId}
      onClose={onClose}
      onViewCandidate={onViewCandidate}
    />
  );
}