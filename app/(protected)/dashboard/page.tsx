import { DrawingBoard } from "@/components/auth/drawing-board";
import { IncorrectPredictions } from "@/components/auth/incorrect-predictions";

const Dashboard = async () => {

  return (
    <div className='w-full h-full p-8 md:p-16 flex flex-col items-center gap-4'>
      <h1 className="text-xl md:text-2xl lg:text-4xl">Panel</h1>
      <div className="flex gap-5">
        <DrawingBoard/>
        <IncorrectPredictions/>
      </div>
    </div>
  );
};

export default Dashboard;