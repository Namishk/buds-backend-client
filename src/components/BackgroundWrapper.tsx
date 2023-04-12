import { FC } from "react";

const BackgroundWrapper: FC = ({}) => {
  return (
    <div className="absolute inset-0 -z-50 h-screen w-screen bg-white">
      <img src="/background.png" className="h-screen md:inset-0 md:w-full" />
    </div>
  );
};

export default BackgroundWrapper;
