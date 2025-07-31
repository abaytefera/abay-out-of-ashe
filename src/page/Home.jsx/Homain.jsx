import Footer from "../../componet/footer";
import Log from "../../componet/log";
import Home from "./Home";

const HomeMain = () => {
  return (
    <div className="flex h-full w-full overflow-auto flex-col gap-16"> 
      <Log />
      <Home />
      <Footer />
    </div>
  );
};

export default HomeMain;
