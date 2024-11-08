import { useParams } from 'react-router-dom';
import CandidateProfile from '../../components/CandidateProfile';

export default function CandidateDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-6xl mx-auto">
      <CandidateProfile />
    </div>
  );
}