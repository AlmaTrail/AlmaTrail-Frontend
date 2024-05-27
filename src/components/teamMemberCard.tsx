import React from "react";

interface TeamMemberCardProps {
  name: string;
  position: string;
  imageUrl: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, position, imageUrl }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 w-64 h-80">
      <div className="w-full h-4/5 bg-gray-200 flex items-center justify-center overflow-hidden">
        <img className="w-full h-full object-cover object-center" src={imageUrl} alt={name} />
      </div>
      <div className="py-2 px-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">{position}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
