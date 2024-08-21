import Link from "next/link";
import Image from "next/image";

interface ImageCardProps {
  src: string,
  title: string,
  subtitle: string,
  href: string
};

export const ImageCard = ({
  src,
  title,
  subtitle,
  href
}: ImageCardProps) => {
  return (
    <Link href={href} className="group relative flex h-80 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
      <Image src={src} width="1000" height="1000" alt="card" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
      <div className="relative flex flex-col">
        <span className="text-gray-300">{subtitle}</span>
        <span className="text-lg font-semibold text-white lg:text-lg">{title}</span>
      </div>
    </Link>
  );
};