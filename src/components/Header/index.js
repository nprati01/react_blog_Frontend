import { Link } from "react-router-dom";
import navLogo from '../../images/navLogo.png'

const Header = (props) => {
    return(
      <div className="container mx-auto px-2 mb-8">
      <div className="border-b w-full inline-block border-white-400 pt-6 pb-0">
        <div className="md:float-left block">
          <Link to='/blogs'>
            <span className="cursor-pointer font-bold text-4xl text-white">Dev Blog</span>
          </Link>

        </div>
        <div className="hidden md:float-left md:contents">
          <span className="pb-1 md:float-right mt-2 ml-4 mb-0">
          <img src={navLogo} alt="nav logo" height={100} width={100} />
          </span>

        </div>
      </div>
    </div>
  );
};



  export default Header
