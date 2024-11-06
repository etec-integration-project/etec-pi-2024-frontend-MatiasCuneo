const ProtectedLayout = (
  { children }: { children: React.ReactNode }
) => {
  return (
    <div className="py-5 w-full bg-[#FAF1E4] flex items-center justify-center">
      {children}
    </div>
  );
};

export default ProtectedLayout;
