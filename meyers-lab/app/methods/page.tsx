"use client";
import React, { useState, useEffect, useRef } from 'react';
import { openDB } from 'idb';

export default function Methods() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [pdfFiles, setPdfFiles] = useState<string[]>([]);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.getElementById('header');
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setPdfFiles(prev => [fileUrl, ...prev]); // Prepend the new file URL to the array
        setCurrentPdfIndex(0); // Reset the index to display the newest upload
    }
};


  useEffect(() => {
    const initDB = async () => {
        const db = await openDB('pdfDB', 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('pdfs')) {
                    db.createObjectStore('pdfs', { keyPath: 'id' });
                }
            },
        });
        return db;
    };

    initDB();
  }, []);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const goToNextPdf = () => {
    setCurrentPdfIndex((currentIndex) => (currentIndex + 1) % pdfFiles.length);
  };

  const goToPreviousPdf = () => {
    setCurrentPdfIndex((currentIndex) => currentIndex === 0 ? pdfFiles.length - 1 : currentIndex - 1);
  };

  return (
    <div className="ml-3 flex h-full min-h-screen w-full flex-col px-6 pt-2 font-circ-std">
      {/* Dynamic spacer based on header height */}
      <div style={{ minHeight: `${headerHeight}px` }}></div>
      <div className="my-[5vh] min-h-[10vh]">
        <h1 className="pl-48 text-4xl text-primary">Methods</h1>
        <p className="pl-48 text-lg text-primary">Methods page blurb...</p>
      </div>

      {/* PDF Carousel */}
      {pdfFiles.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '67vh',
            overflow: 'hidden',
          }}
        >
          <iframe
            src={pdfFiles[currentPdfIndex]}
            style={{ width: '60%', height: '100%', border: 'none' }}
            frameBorder="0"
          ></iframe>
<div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
    <button 
        onClick={goToPreviousPdf} 
        style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
        }}>
        &#8592;
    </button>
    <button 
        onClick={goToNextPdf} 
        style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
        }}>
        &#8594;
    </button>
</div>

        </div>
      )}

      {/* Upload button with extra padding below */}
      <div className="mt-4 flex items-center justify-center" style={{ paddingBottom: '20px' }}>
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
        <button
          className="focus:shadow-outline rounded bg-primary-red px-4 py-2 font-bold text-white hover:bg-primary-red_light 
          focus:outline-none"
          onClick={triggerFileInput}
        >
          Upload PDF
        </button>
      </div>
    </div>
  );
}
