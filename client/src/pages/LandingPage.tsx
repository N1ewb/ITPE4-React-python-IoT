const LandingPage = () => {
  return (
    <div className="p-20 flex flex-col items-center gap-10">
      <div className="landing-page-header flex flex-col items-center gap-5 my-44">
        <h1 className="text-indigo-800 text-4xl font-bold">
          Welcome ITPE4 IoT Middleware!
        </h1>
        <p className="text-indigo-600">A website for connecting IoT to software</p>
        <button className="bg-indigo-400 px-10 py-2 text-white text-2xl rounded-sm">Get Started!</button>
      </div>
      <div className="landing-page-content flex flex-row gap-20">
        <div className="col border-2 border-solid border-indigo-700 rounded-lg h-[500px] w-[400px] "></div>
        <div className="col border-2 border-solid border-indigo-700 rounded-lg h-[500px] w-[400px]"></div>
        <div className="col border-2 border-solid border-indigo-700 rounded-lg h-[500px] w-[400px]"></div>
      </div>
    </div>
  );
};

export default LandingPage;
