import "../../../index.css";
import MainCard from "../../MainCard/MainCard";

const Home = () => {
    return (
        <div className="flex justify-center items-center">
            <MainCard>
                <h1 className="text-3xl mb-4">Welcome to SoloLink!</h1>
                <h3>
                    SoloLink is a free and open source alternative to services like
                    Linktree. Here you can host a list of useful links seperated by
                    categories. A wishlist from your favorite shopping site? All of your
                    social media profiles? Platforms where people can stream your music?
                    It's all up to you, and completely free forever!
                </h3>
            </MainCard>
        </div>
    );
};

export default Home;
