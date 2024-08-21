import React from 'react';

const Help: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-md shadow-md mt-12">
      <h2 className="text-2xl font-semibold mb-4">How to Use the QR Code Generator</h2>
      <p className="mb-4">
        This QR Code Generator allows you to create various types of QR codes. Follow the instructions below based on the type of QR code you want to generate:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>URL:</strong> Enter a URL (e.g., https://example.com) to generate a QR code that directs to that webpage.
        </li>
        <li>
          <strong>PDF:</strong> Upload a PDF file to generate a QR code that links to the uploaded PDF. The file will be converted to a Data URL.
        </li>
        <li>
          <strong>Plain Text:</strong> Enter any text you want to encode in the QR code.
        </li>
        <li>
          <strong>SMS:</strong> Enter the recipient's phone number. Optionally, add a message in the message field. The QR code will allow the user to send an SMS to the entered number with the pre-filled message.
        </li>
        <li>
          <strong>Email:</strong> Enter the recipient's email address. Optionally, add a message in the message field. The QR code will allow the user to send an email to the entered address with the pre-filled message.
        </li>
        <li>
          <strong>Phone:</strong> Enter a phone number to generate a QR code that allows the user to call that number.
        </li>
        <li>
          <strong>Contact:</strong> Enter a contact's name and phone number to generate a vCard QR code. The QR code will contain the contact details in vCard format.
        </li>
      </ul>
      <p className="mb-4">
        Once you've entered the required information, click the <strong>Generate</strong> button to create the QR code. You can then download the QR code image using the <strong>Download QR Code</strong> button.
      </p>
      <h3 className="text-xl font-semibold mt-6 mb-2">How to Use QR Codes on Mobile Devices</h3>
      <div className="mb-4">
        <h4 className="font-semibold mb-1">For Android Devices:</h4>
        <ul className="list-disc list-inside">
          <li>Open your camera app. Most modern Android devices have a built-in QR code scanner in the camera app.</li>
          <li>Point your camera at the QR code. Ensure the QR code is within the viewfinder and is well-lit.</li>
          <li>A notification or popup should appear with the action associated with the QR code (e.g., opening a URL, sending an SMS, etc.).</li>
          <li>Tap on the notification or follow the prompts to perform the desired action.</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-1">For iOS Devices (iPhone/iPad):</h4>
        <ul className="list-disc list-inside">
          <li>Open the Camera app. QR code scanning is integrated directly into the Camera app on iOS 11 and later versions.</li>
          <li>Point your camera at the QR code. The camera will automatically recognize the QR code and display a notification.</li>
          <li>Tap the notification or banner that appears at the top of the screen to perform the action associated with the QR code (e.g., opening a URL, sending an SMS, etc.).</li>
          <li>If the QR code requires more information (e.g., entering a message), follow the prompts on the screen.</li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
