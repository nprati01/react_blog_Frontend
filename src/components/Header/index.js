import { Link } from "react-router-dom";

const Header = (props) => {
    return(
      <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-white-400 py-8">
        <div className="md:float-left block">
          <Link to='/blogs'>
            <span className="cursor-pointer font-bold text-4xl text-white">Dev Blog</span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
            <p>Some Content</p>
            <p>Maybe a logo </p>


          </span>


        </div>
      </div>
    </div>
  );
};



  export default Header
