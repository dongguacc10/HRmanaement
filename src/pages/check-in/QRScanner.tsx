import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Camera } from 'lucide-react';
import { Button } from '../../components/Button';

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  const handleScan = () => {
    setIsScanning(true);
    // Simulating QR code scan
    setTimeout(() => {
      setIsScanning(false);
      navigate('/check-in/verify');
    }, 2000);
  };

  return (
    <div className="text-center">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <QrCode className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Interview Check-in</h2>
        <p className="mt-2 text-sm text-gray-600">
          Please scan your interview QR code to begin the check-in process
        </p>
        
        {isScanning ? (
          <div className="mt-8">
            <div className="relative mx-auto w-64 h-64 bg-gray-100 rounded-lg overflow-hidden">
              <Camera className="absolute inset-0 m-auto h-8 w-8 text-gray-400 animate-pulse" />
              <div className="absolute inset-0 border-2 border-blue-500 animate-scan"></div>
            </div>
            <p className="mt-4 text-sm text-gray-600">Scanning...</p>
          </div>
        ) : (
          <Button
            onClick={handleScan}
            className="mt-8 w-full"
            size="lg"
          >
            Start Scanning
          </Button>
        )}
      </div>
    </div>
  );
}