import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import ThemeBtn from "./ThemeBtn";

function Header() {
  return (
    <header className="m-4 p-4 bg-[rgb(247,247,247)] rounded-xl">
      <div className="cover flex justify-between items-center gap-2 flex-wrap">
        <div className="search_bar py-2 pe-4 ps-10  rounded-[32px] font-medium text-gray-500 bg-white relative">
           <SearchIcon className="w-5 h-5 absolute top-0 left-0 translate-x-[50%] translate-y-[50%]" />
          <input type="text" name="search" placeholder="Search..." className="border-none outline-none text-black"/>
        </div>
        <div className="btns flex items-center gap-2">
        <ThemeBtn/>
        <button className="sign_btn flex gap-2 bg-white w-[max-content] py-2 px-4 rounded-[32px] font-medium text-gray-500">
          <LogoutIcon className="w-5 h-5" />
          <span>Log out</span>
        </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
