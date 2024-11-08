import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '../../components/Button';

export default function PhoneVerification() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const navigate = useNavigate();

  const handleSendCode = () => {
    // Simulate sending verification code
    setStep('code');
  };

  const handleVerify = () => {
    // Simulate verification
    navigate('/check-in/confirmation');
  };

  return (
    <div className="text-center">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Phone className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Verify Your Phone</h2>
        
        {step === 'phone' ? (
          <>
            <p className="mt-2 text-sm text-gray-600">
              Enter your phone number to receive a verification code
            </p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              onClick={handleSendCode}
              className="mt-4 w-full"
              disabled={!phone}
            >
              Send Code
            </Button>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm text-gray-600">
              Enter the verification code sent to your phone
            </p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code"
              className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              onClick={handleVerify}
              className="mt-4 w-full"
              disabled={!code}
            >
              Verify
            </Button>
          </>
        )}
      </div>
    </div>
  );
}