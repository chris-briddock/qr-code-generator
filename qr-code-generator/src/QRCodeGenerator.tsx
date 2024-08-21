import React, { useState, ChangeEvent } from 'react';
import QRCode from 'qrcode.react';

type QRCodeType = 'URL' | 'PDF' | 'Text' | 'SMS' | 'Email' | 'Phone' | 'Contact';

const QRCodeGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [qrCodeValue, setQRCodeValue] = useState<string>('');
  const [qrCodeType, setQRCodeType] = useState<QRCodeType>('URL');
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setQRCodeType(e.target.value as QRCodeType);
    setInputText('');
    setMessage('');
    setPdfFile(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const generateQRCode = (): void => {
    let value = '';
    switch (qrCodeType) {
      case 'URL':
        value = inputText;
        break;
      case 'PDF':
        if (pdfFile) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              value = reader.result as string;
              setQRCodeValue(value);
            }
          };
          reader.readAsDataURL(pdfFile);
        }
        return;
      case 'Text':
        value = inputText;
        break;
      case 'SMS':
        value = `sms:${inputText}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
        break;
      case 'Email':
        value = `mailto:${inputText}${message ? `?body=${encodeURIComponent(message)}` : ''}`;
        break;
      case 'Phone':
        value = `tel:${inputText}`;
        break;
      case 'Contact':
        value = `BEGIN:VCARD\nVERSION:3.0\nFN:${inputText}\nTEL;TYPE=cell:${inputText}\nEND:VCARD`;
        break;
      default:
        value = inputText;
        break;
    }
    setQRCodeValue(value);
  };

  const downloadQRCode = (): void => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-3xl font-bold mb-6">QR Code Generator</h1>
      <div className="flex flex-col items-center mb-4 w-full max-w-md">
        <select
          value={qrCodeType}
          onChange={handleTypeChange}
          className="px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="URL">URL</option>
          <option value="PDF">PDF</option>
          <option value="Text">Plain Text</option>
          <option value="SMS">SMS</option>
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
          <option value="Contact">Contact</option>
        </select>
        
        {qrCodeType === 'PDF' ? (
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        ) : (
          <>
            <input
              type="text"
              value={inputText}
              onChange={handleChange}
              placeholder={`Enter ${qrCodeType}...`}
              className="px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {(qrCodeType === 'SMS' || qrCodeType === 'Email') && (
              <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                placeholder="Enter message..."
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            )}
          </>
        )}
        <button
          onClick={generateQRCode}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mt-4"
        >
          Generate
        </button>
      </div>
      <div className="flex flex-col items-center mt-4">
        {qrCodeValue && (
          <>
            <QRCode value={qrCodeValue} size={128} className="mb-4" />
            <button
              onClick={downloadQRCode}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              Download QR Code
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
