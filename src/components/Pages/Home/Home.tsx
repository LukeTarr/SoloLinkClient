import "../../../index.css";

const Home = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center m-20 p-16 bg-gray-400 rounded-3xl text-center w-full md:w-1/2 shadow-2xl">
        <h1 className="text-3xl mb-4">Welcome to SoloLink!</h1>
        <h3>
          SoloLink is a free and open source alternative to services like
          Linktree. Here you can host a list useful links seperated by
          categories. A wishlist from your favorite shopping site? All of your
          social media profiles? Platforms where people can stream your music?
          It's all up to you, and completely free forever!
        </h3>
      </div>
    </div>
  );
};

export default Home;
