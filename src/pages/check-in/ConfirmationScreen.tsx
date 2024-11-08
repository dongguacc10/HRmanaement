import { CheckCircle, Printer } from 'lucide-react';
import { Button } from '../../components/Button';

export default function ConfirmationScreen() {
  const handlePrintResume = () => {
    // Implement resume printing logic
    console.log('Printing resume...');
  };

  return (
    <div className="text-center">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Check-in Complete!</h2>
        <p className="mt-2 text-sm text-gray-600">
          You have successfully checked in for your interview
        </p>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900">Interview Details</h3>
          <dl className="mt-2 text-sm text-gray-600">
            <div className="mt-1">
              <dt className="inline">Time: </dt>
              <dd className="inline">2:30 PM</dd>
            </div>
            <div className="mt-1">
              <dt className="inline">Location: </dt>
              <dd className="inline">Conference Room A</dd>
            </div>
            <div className="mt-1">
              <dt className="inline">Interviewer: </dt>
              <dd className="inline">John Smith</dd>
            </div>
          </dl>
        </div>

        <Button
          onClick={handlePrintResume}
          className="mt-6 w-full"
          variant="secondary"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Resume
        </Button>
      </div>
    </div>
  );
}