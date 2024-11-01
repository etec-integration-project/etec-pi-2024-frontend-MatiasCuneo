import { DrawingBoard } from "@/components/auth/drawing-board";
import { FormSuccess } from "@/components/form-success";
import { useState } from "react";

const Dashboard = async () => {
  const [prediction, setPrediction] = useState(null);

  const handlePrediction = (newPred: any) => {
    setPrediction(newPred);
  };

  return (
    <div className='w-full h-full p-8 md:p-16 flex flex-col items-center gap-4'>
      <h1 className="text-xl md:text-2xl lg:text-4xl">Panel</h1>
      <DrawingBoard onPredict={handlePrediction}/>
      {prediction && (
        <FormSuccess message={prediction}/>
      )}
    </div>
  );
};

export default Dashboard;