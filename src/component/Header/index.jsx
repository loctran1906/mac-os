import LeftHeader from "./LeftHeadder";
import RightHeader from "./RightHeader";

const Header = () => {
    return (
        <section className="top color-light bg-menu full-width display-flex-center justify-content-between position-fix top-0 left-0 right-0">
            <LeftHeader />
            <RightHeader />
        </section>
    );
};

export default Header;
