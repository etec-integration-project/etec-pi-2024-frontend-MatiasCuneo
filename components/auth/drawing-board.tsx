"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { predict } from '@/actions/prediction';

interface DrawingBoardProps {
  onPredict: any;
};

export const DrawingBoard = ({
  onPredict,
}: DrawingBoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = window.innerHeight / 2;
    canvas.height = window.innerHeight / 2;
    canvas.style.width = `${window.innerHeight / 2}px`;
    canvas.style.height = `${window.innerHeight / 2}px`;
    canvas.style.backgroundColor = 'white';
    
    const ctx = canvas.getContext('2d');

    ctx!.lineWidth = 20;
    ctx!.lineCap = 'round';
    ctx!.strokeStyle = 'black';
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
      <Button
        size='xlg'
        onClick={() => onPredict(predict)}
      >
        Predicción
      </Button>
    </>
  );
};