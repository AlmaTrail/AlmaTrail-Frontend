import React from "react";
import TeamMemberCard from "@/components/teamMemberCard";

interface TeamMember {
  name: string;
  position: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ayush Bansal",
    position: "Co-Founder",
    imageUrl: "/images/image.jpg",
  },
  {
    name: "Harpreet Singh",
    position: "Co-Founder",
    imageUrl: "/images/image.jpg",
  },
  {
    name: "Gautam Garg",
    position: "Co-Founder",
    imageUrl: "/images/image.jpg",
  }
];

const OurTeam: React.FC = () => {
  return (
    <section className="py-12 bg-[#1d0828]">
      <div className="container mx-auto px-8 lg:px-16">
        <h2 className="text-3xl text-white font-bold text-center mb-12">Our Team</h2>
        <div className="flex flex-wrap justify-center gap-32 mb-12">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} name={member.name} position={member.position} imageUrl={member.imageUrl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
