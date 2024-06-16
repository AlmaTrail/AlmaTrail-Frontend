import React from "react";

interface ImpactItemProps {
  title: string;
  description: string;
  imageUrl: string;
  imageFirst: boolean;
}

const ImpactItem: React.FC<ImpactItemProps> = ({ title, description, imageUrl, imageFirst }) => {
  return (
    <div className={`flex flex-col ${imageFirst ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:space-x-8 space-y-4 lg:space-y-0`}>
      <div className="lg:w-1/3 flex justify-center">
        <img src={imageUrl} alt={title} className="w-40 h-40 object-cover rounded-xl" />
      </div>
      <div className="lg:w-2/3 flex flex-col justify-center text-center lg:text-left h-40">
        <h3 className="text-xl font-semibold text-[#1d0828] mb-2">{title}</h3>
        <p className="text-gray-700 font-gilroy-regular overflow-hidden">{description}</p>
      </div>
    </div>
  );
};

export default ImpactItem;
