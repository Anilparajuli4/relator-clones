import { useLocation, useNavigate } from "react-router-dom";
function Header() {
  const Location = useLocation();
  const navigate = useNavigate();
  function pathMatchRoute(path) {
    if (path === Location.pathname) {
      return true;
    }
  }
  return (
    <div className="border shadow-sm sticky top-0 z-[50]">
      <header className="flex items-center justify-between px-3 max-w-6xl m-auto">
        <div>
          <img
            className="h-6 cursor-pointer"
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="relator-icon"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10 text-gray-400 cursor-pointer">
            <li
              className={`py-3 font-semibold text-sm border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "border-b-red-500 text-black"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-3 font-semibold border-b-[3px] border-b-transparent text-sm ${
                pathMatchRoute("/offers") && "border-b-red-500 text-black"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`py-3 font-semibold border-b-[3px] border-b-transparent text-sm ${
                pathMatchRoute("/sign-in") && "border-b-red-500 text-black"
              }`}
              onClick={() => navigate("/sign-in")}
            >
              Sign in
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
