import React from "react";
import Image from "next/image";

interface TeamMemberCardProps {
  name: string;
  position: string;
  imageUrl: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, position, imageUrl }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:border-2 border-[#3b0764] w-64">
      <div className="w-full bg-purple-900 flex items-center justify-center overflow-hidden">
        <img className="w-full" src={imageUrl} alt={name} />
      </div>
      <div className="py-2 px-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">{position}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
