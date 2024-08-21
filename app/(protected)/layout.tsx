const ProtectedLayout = (
  { children }: { children: React.ReactNode }
) => {
  return (
    <div className="h-full w-full bg-[#FAF1E4] flex items-center justify-center">
      {children}
    </div>
  );
};

export default ProtectedLayout;