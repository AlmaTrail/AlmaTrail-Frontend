import React from "react";
import ImpactItem from "@/components/impactItem";

const impactData = [
  {
    title: "Sessions",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum, nibh a malesuada ultricies, sapien eros bibendum sapien, et bibendum justo risus euismod ex. Integer gravida ligula at velit efficitur, a ullamcorper ligula fringilla. Donec vel suscipit velit, a dapibus metus. Nulla facilisi. Curabitur at urna eget arcu egestas ullamcorper a vitae purus.",
    imageUrl: "/images/image.jpg",
    imageFirst: true,
  },
  {
    title: "University Selection",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum, nibh a malesuada ultricies, sapien eros bibendum sapien, et bibendum justo risus euismod ex. Integer gravida ligula at velit efficitur, a ullamcorper ligula fringilla. Donec vel suscipit velit, a dapibus metus. Nulla facilisi. Curabitur at urna eget arcu egestas ullamcorper a vitae purus.",
    imageUrl: "/images/image.jpg",
    imageFirst: false,
  },
  {
    title: "Documentation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum, nibh a malesuada ultricies, sapien eros bibendum sapien, et bibendum justo risus euismod ex. Integer gravida ligula at velit efficitur, a ullamcorper ligula fringilla. Donec vel suscipit velit, a dapibus metus. Nulla facilisi. Curabitur at urna eget arcu egestas ullamcorper a vitae purus.",
    imageUrl: "/images/image.jpg",
    imageFirst: true,
  }
];

const Impact: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-8 lg:px-28">
        <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
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
  );
};

export default Impact;
