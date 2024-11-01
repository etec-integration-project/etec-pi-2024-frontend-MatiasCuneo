import { DrawingBoard } from "@/components/auth/drawing-board";

const Dashboard = async () => {
  return (
    <div className='w-full h-full p-8 md:p-16 flex flex-col items-center gap-4'>
      <h1 className="text-xl md:text-2xl lg:text-4xl">Panel</h1>
      <DrawingBoard></DrawingBoard>
    </div>
  );
};

export default Dashboard;