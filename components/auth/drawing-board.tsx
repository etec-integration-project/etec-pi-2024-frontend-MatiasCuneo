"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { FormSuccess } from '../form-success';

export const DrawingBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState<any | null>(null);

  const handlePrediction = () => {
    const canvas = canvasRef.current;

    canvas!.toBlob(async (blob) => {
      const formData = new FormData();

      if (!blob) return;

      formData.append('file', blob, 'file.png');

      try {
        const response = await fetch('/tf/predict', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        console.log(data);
        if (data.success) setPrediction(data.success);
      } catch (error) {
        console.log(error);
      }
    }, 'image/png');
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = window.innerHeight / 2;
    canvas.height = window.innerHeight / 2;
    canvas.style.width = `${window.innerHeight / 2}px`;
    canvas.style.height = `${window.innerHeight / 2}px`;
    canvas.style.backgroundColor = 'white';
    
    const ctx = canvas.getContext('2d');

    ctx!.lineWidth = 30;
    ctx!.lineCap = 'round';
    ctx!.strokeStyle = 'black';
    ctx!.fillStyle = 'white';
    ctx!.fillRect(0, 0, canvas.width, canvas.height);
    contextRef.current = ctx;
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;

    contextRef.current!.beginPath();
    contextRef.current!.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    contextRef.current!.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    contextRef.current!.clearRect(0, 0, canvas.width, canvas.height);
    contextRef.current!.fillStyle = 'white';
    contextRef.current!.fillRect(0, 0, canvas.width, canvas.height);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const { offsetX, offsetY } = event.nativeEvent;

    contextRef.current!.lineTo(offsetX, offsetY);
    contextRef.current!.stroke();
    contextRef.current!.stroke();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={() => setIsDrawing(false)}
        style={{ border: '1px solid black' }}
      />
      {(prediction || prediction === 0) && (
        <FormSuccess big message={prediction}/>
      )}
      <div className="flex gap-5">
        <Button
          size='xlg'
          onClick={handlePrediction}
        >
          Predicción
        </Button>
        <Button
          size='xlg'
          variant='outline'
          onClick={clearCanvas}
        >
          Limpiar
        </Button>
      </div>
    </>
  );
};
