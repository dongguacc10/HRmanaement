import { InterviewDetailContent } from './interview/InterviewDetailContent';

interface InterviewDetailDrawerProps {
  interviewId: string;
  onClose: () => void;
  onViewCandidate?: (candidateId: string) => void;
}

export default function InterviewDetailDrawer({ interviewId, onClose, onViewCandidate }: InterviewDetailDrawerProps) {
  return <InterviewDetailContent interviewId={interviewId} onClose={onClose} onViewCandidate={onViewCandidate} />;
}