import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const { data, status } = useSession();

  const handelAuth = () => {
    if (status === "authenticated") {
      return () => signOut();
    } else {
      return () => signIn();
    }
  };
  return (
    <div className="navbar z-10 justify-between bg-transparent py-4 px-4">
      <div className="">
        <Link className="btn-ghost btn text-3xl normal-case" href={"/"}>
          <img src="./logo.png" />
        </Link>
      </div>
      <div className="gap-5">
        <div className="flex-none">
          <ul className="menu menu-horizontal text-black">
            <li>
              <Link className={`rounded-lg text-xl font-bold`} href="/docs">
                Documentation
              </Link>
            </li>
          </ul>
        </div>
        {status === "authenticated" ? (
          <div className="dropdown-end dropdown">
            <label
              tabIndex={0}
              className="btn-ghost avatar btn gap-4 text-xl font-semibold text-black"
            >
              <div className="w-10 rounded-full">
                <img src={data.user.image || undefined} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-white p-2 text-black shadow"
            >
              <li>
                <a className="justify-start">
                  <img src="profile-icon.png" className="h-6" />
                  {/* <span>{data.user.name}'s</span> */}
                  Profile
                </a>
              </li>

              <li onClick={() => void signOut()}>
                <a className="justify-start">
                  <img src="logout-icon.png" className="h-6" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div
            className="btn w-24 border-0 bg-white text-black drop-shadow-card hover:bg-blue-grotto"
            onClick={() => void signIn()}
          >
            Sign In
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
