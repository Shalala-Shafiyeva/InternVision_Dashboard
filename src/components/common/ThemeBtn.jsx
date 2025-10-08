import { ReactComponent as DarkModeIcon } from "../../assets/icons/darkmode.svg";
import { ReactComponent as LightModeIcon } from "../../assets/icons/lightmode.svg";
import { useTheme } from "../../context/ThemeContext";

function ThemeBtn() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme_switcher rounded-[32px] " onClick={toggleTheme}>
      {theme === "light" ? (
        <button
          type="button"
          className="flex items-center p-2 bg-white rounded-[32px] text-orange-400 hover:bg-orange-200 transition duration-50 ease-in-out focus:outline-hidden"
          data-hs-theme-click-value="light"
        >
          <LightModeIcon className="w-5 h-5" />
        </button>
      ) : (
        <button
          type="button"
          className="flex items-center p-2 rounded-[32px] bg-white/10 text-white hover:bg-white/20 focus:outline-hidden"
          data-hs-theme-click-value="dark"
        >
          <DarkModeIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default ThemeBtn;
