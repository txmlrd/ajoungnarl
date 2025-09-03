import HomePost from "./HomePost";
const LeftSideHome = () => {
  return (
    <div>
      <h1 className="font-cormorant lg:text-[36px] text-3xl font-bold">Featured Article</h1>
      <div className="flex flex-col gap-10 mt-5 lg:mt-10 lg:ml-10">
        <HomePost />
        <HomePost />
        <HomePost />
        <HomePost />
      </div>
    </div>
  );
};

export default LeftSideHome;
