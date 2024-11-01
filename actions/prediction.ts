"use server";

export const predict = async (formData: FormData) => {
  try {
    const response = await fetch('/app/predict', {
      method: 'POST',
      body: formData,
    });

    console.log('REACHED');

    const data = await response.json();

    return data;
  } catch (error) {
    return { 'error': error };  
  }
};