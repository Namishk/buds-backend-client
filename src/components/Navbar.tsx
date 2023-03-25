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
  const router = useRouter();
  return (
    <div className="navbar justify-between bg-base-100 py-4 px-4">
      <div className="">
        <Link className="btn-ghost btn text-3xl normal-case" href={"/"}>
          BudsBackend
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal">
          <li>
            <Link
              className={`rounded-lg text-xl font-bold ${
                router.pathname === "/docs" ? "" : "text-white"
              }`}
              href="/"
            >
              DashBoard
            </Link>
          </li>
          <li>
            <Link
              className={`rounded-lg text-xl font-bold ${
                router.pathname === "/docs" ? "text-white" : ""
              }`}
              href="/docs"
            >
              Docs
            </Link>
          </li>
        </ul>
      </div>
      <div className="gap-5">
        {status === "authenticated" ? (
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

              <li onClick={() => void signOut()}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="btn" onClick={() => void signIn()}>
            Sign In
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
