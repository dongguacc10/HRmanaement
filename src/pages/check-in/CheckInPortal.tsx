import { Routes, Route } from 'react-router-dom';
import QRScanner from './QRScanner';
import PhoneVerification from './PhoneVerification';
import ConfirmationScreen from './ConfirmationScreen';

export default function CheckInPortal() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<QRScanner />} />
          <Route path="/verify" element={<PhoneVerification />} />
          <Route path="/confirmation" element={<ConfirmationScreen />} />
        </Routes>
      </div>
    </div>
  );
}