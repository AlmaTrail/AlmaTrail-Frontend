import React from "react";
import Image from "next/image";

interface ImpactItemProps {
  title: string;
  description: string;
  imageUrl: string;
  imageFirst: boolean;
}

const ImpactItem: React.FC<ImpactItemProps> = ({ title, description, imageUrl, imageFirst }) => {
  return (
    <div className={`flex flex-col ${imageFirst ? 'lg:flex-row' : 'lg:flex-row-reverse'} justify-around`}>
      <Image width={200} height={120}
        src={imageUrl} alt={title}
        className="rounded-lg" />
      <div className={` flex flex-col h-40 ${imageFirst ? 'ml-10' : 'ml-0'}`}>
        <h3 className="w-2/5 text-left text-xl font-semibold text-[#1d0828] mb-3">{title}</h3>
        <p className="text-left text-gray-700 font-gilroy-regular">{description}</p>
      </div>
    </div>
  );
};

export default ImpactItem;
