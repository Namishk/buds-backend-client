import Link from "next/link";
import { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data, status } = useSession();

  const handelAuth = () => {
    if (status === "authenticated") {
      signOut();
    } else {
      signIn();
    }
  };
  return (
    <div className="navbar bg-black py-4 ">
      <div className="navbar-start flex-1 gap-10">
        <Link className="btn-ghost btn text-3xl normal-case" href={"/"}>
          BudsBackend
        </Link>
      </div>
      <div className="navbar-center ml-12 text-2xl font-bold text-white">
        DashBoard
      </div>
      <div className="navbar-end flex-none gap-5 pr-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input-bordered input"
          />
        </div>
        {status === "authenticated" ? (
          <>
            <div className="dropdown-end dropdown">
              <label
                tabIndex={0}
                className="btn-ghost avatar btn gap-4 text-lg font-semibold"
              >
                <div className="w-10 rounded-full">
                  <img src={data.user.image || undefined} />
                </div>
                <span>{data.user.name}</span>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>

                <li onClick={() => handelAuth()}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="btn" onClick={() => handelAuth()}>
            Sign In
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
