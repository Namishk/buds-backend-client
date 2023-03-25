import { AuthType, platformType } from "~/types/projectTypes";

interface NewProjectCardProps {
  platform: platformType;
  authType: AuthType;
}

const NewProjectCard = (props: NewProjectCardProps) => {
  return (
    <div className="card w-[23%] cursor-pointer bg-base-300 shadow-xl hover:bg-base-200">
      <div className="card-body flex-row items-center justify-center text-center">
        <div>
          {props.authType === AuthType.JWT ? (
            <img className="h-14" src={"/jwt.svg"} />
          ) : (
            <img className="h-14" src={"/cookies.svg"} />
          )}
          <h2 className="">{props.authType}</h2>
        </div>
        <span>+</span>
        <div>
          {props.platform === platformType.Node ? (
            <img className="h-14" src={"/nodejs.svg"} />
          ) : (
            <img className="h-14" src={"/golang.svg"} />
          )}
          <h2 className="">{props.platform}</h2>
        </div>
      </div>
    </div>
  );
};
export default NewProjectCard;
