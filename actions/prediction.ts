"use server";

export const predict = async (canvas: HTMLCanvasElement) => {
  canvas.toBlob(async (blob) => {
    if (!blob) return;

    const formData = new FormData();
    formData.append('image', blob, 'drawing.png');

    try {
      const response = await fetch('/app/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      return data;
    } catch (error) {
      return { 'error': error };  
    }
  }, 'image/png');

  return { 'error': 'Something went wrong' };
};