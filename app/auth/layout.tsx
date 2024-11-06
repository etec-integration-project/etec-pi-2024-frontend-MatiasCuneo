const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex py-5 flex-col items-center justify-center bg-[#FAF1E4]">
      {children}
    </div>
  );
};

export default AuthLayout;
