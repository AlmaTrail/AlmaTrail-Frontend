'use client';
import Navbar from "@/components/navbar";
import GetInTouch from '@/components/writeUs';
import FooterSection from "@/components/footerSections";
import ImpactItem from "@/components/impactItem";
import TeamMemberCard from "@/components/teamMemberCard";

const teamMembers = [
  {
    name: "Ayush Bansal",
    position: "Co-Founder",
    imageUrl: "/images/man.png",
  },
  {
    name: "Harpreet Singh",
    position: "Co-Founder",
    imageUrl: "/images/man.png",
  },
  {
    name: "Gautam Garg",
    position: "Co-Founder",
    imageUrl: "/images/man.png",
  }
];

const impactData = [
  {
    title: "Sessions",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum, nibh a malesuada ultricies, sapien eros bibendum sapien, et bibendum justo risus euismod ex. Integer gravida ligula at velit efficitur, a ullamcorper ligula fringilla. Donec vel suscipit velit, a dapibus metus. Nulla facilisi. Curabitur at urna eget arcu egestas ullamcorper a vitae purus.",
    imageUrl: "/images/man.png",
    imageFirst: true,
  },
  {
    title: "University Selection",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum, nibh a malesuada ultricies, sapien eros bibendum sapien, et bibendum justo risus euismod ex. Integer gravida ligula at velit efficitur, a ullamcorper ligula fringilla. Donec vel suscipit velit, a dapibus metus. Nulla facilisi. Curabitur at urna eget arcu egestas ullamcorper a vitae purus.",
    imageUrl: "/images/man.png",
    imageFirst: false,
  },
  {
    title: "Documentation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum, nibh a malesuada ultricies, sapien eros bibendum sapien, et bibendum justo risus euismod ex. Integer gravida ligula at velit efficitur, a ullamcorper ligula fringilla. Donec vel suscipit velit, a dapibus metus. Nulla facilisi. Curabitur at urna eget arcu egestas ullamcorper a vitae purus.",
    imageUrl: "/images/man.png",
    imageFirst: true,
  }
];

const AboutUs = () => {
  return (
    <main>
      <div className="h-screen mx-auto bg-[#1d0828] flex justify-center pb-2 items-center relative">
        <Navbar />
        <div>
          <p className="text-4xl text-white font-gilroy-bold text-center">We are providing the best network for get your doubts clear.</p>
          <p className="text-4xl text-white font-gilroy-bold text-center m-5">For giving you the better future</p>

        </div>
      </div>
      <section className="py-12 flex justify-center items-center">
        <div className="container mx-auto px-8 lg:px-28">
          <h2 className="text-3xl text-[#1d0828] font-gilroy-bold text-center mb-8">Our Impact</h2>
          <div className="space-y-12">
            {impactData.map((item, index) => (
              <ImpactItem
                key={index}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                imageFirst={item.imageFirst}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-[#1d0828]">
        <div className="container p-8 bg-white w-11/12 rounded-xl">
          <h2 className="text-4xl text-center font-gilroy-bold text-[#1d0828]">The team that makes it all possible.</h2>
          <div className="flex items-center justify-center py-5 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} name={member.name} position={member.position} imageUrl={member.imageUrl} />
            ))}
          </div>
        </div>
      </section>
      <GetInTouch />
      <FooterSection />
    </main>
  );
}

export default AboutUs