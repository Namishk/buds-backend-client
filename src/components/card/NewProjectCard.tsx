import { FC } from "react";
import { AuthType, platformType } from "~/types/projectTypes";

const NewProjectCard: FC = () => {
  return (
    <div className="card aspect-3/2 h-56 cursor-pointer bg-blue-grotto drop-shadow-card hover:scale-105">
      <div className="card-body flex-col items-center justify-center text-center text-white">
        <span className="text-5xl font-bold">+</span>
        <span className="text-xl">Add Project</span>
      </div>
    </div>
  );
};
export default NewProjectCard;
