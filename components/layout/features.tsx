import Image from "next/image";

interface FeatureProps {
  title: string,
  description?: string,
  minimalistic?: boolean,
  src: string,
};

export const Feature = ({
  title,
  description,
  minimalistic,
  src
}: FeatureProps) => {
  // <p className="group-hover:opacity-0 transition-all duration-75 text-center text-gray-500">{description}</p>

  return (
    <div data-aos="fade-up" className="flex flex-col items-center justify-center relative group">
      {minimalistic && (
        <div className="transition-all duration-75 mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#435334] shadow-lg md:h-14 md:w-14 md:rounded-xl group-hover:opacity-0">
          <Image
            alt="Icon"
            src={src}
            loading="lazy"
            width="36"
            height="36"
          />
        </div>
      ) || (
        <div className="transition-all duration-75 mb-5 flex h-12 w-12 items-center justify-center md:h-14 md:w-14 group-hover:opacity-0">
          <Image
            alt="Icon"
            src={src}
            loading="lazy"
            width="48"
            height="48"
          />
        </div>
      )}
      <h3 className="group-hover:opacity-0 transition-all duration-75 mb-2 text-center text-lg font-semibold md:text-lg">{title}</h3>

      <span className="absolute inset-0 opacity-0 bg-[#435334] rounded-lg shadow-lg transition-all duration-300 ease-in-out transform rotateY group-hover:opacity-100 delay-50 flex items-center justify-center cursor-default">
        <h3 className="font-semibold text-center text-lg text-white p-8">{description}</h3>
      </span>
    </div>
  );
};