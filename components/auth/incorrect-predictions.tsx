"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';


export const IncorrectPredictions = () => {
  const [incorrectPredictions, setIncorrectPredictions] = useState<any[]>([]);

  useEffect(() => {
    const savedPredictions = JSON.parse(localStorage.getItem('incorrectPredictions') || '[]');
    setIncorrectPredictions(savedPredictions);
  }, []);

  return (
    <div className='w-1/2'>
      <h1 className='text-xl mb-2'>Predicciones Incorrectas:</h1>
      <div className="grid grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto">
        {incorrectPredictions.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              alt={`${index}`}
              src={item.img}
              height={200}
              width={200}
            />
            <p>Predicción: {item.prediction}</p>
          </div>
        ))}
      </div>
    </div>
  );
};