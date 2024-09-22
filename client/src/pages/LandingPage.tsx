import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex relative flex-col items-center gap-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-indigo-600 [&_h2]:m-0">
      <div
        className="landing-page-header h-screen w-full flex flex-col items-center gap-5 pt-96 z-0"
        style={{
          backgroundImage: `url('/pexels-jakubzerdzicki-25473948.jpg')`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover',
          backgroundBlendMode: 'soft-light',
          backgroundColor: '#323232'
        }}
      >
        <h1 className="text-indigo-400 text-6xl font-bold">
          Welcome ITPE4 IoT Middleware!
        </h1>
        <p className="text-indigo-600">
          A website for connecting IoT to software
        </p>
        <button
          className="bg-indigo-400 px-10 py-2 text-white text-2xl rounded-sm"
          onClick={() => navigate("/Video-stream")}
        >
          Get Started!
        </button>
      </div>
      <div className="landing-page-content  flex flex-col items-center w-full z-10">
        <div
          id="first-section"
          className="first-section flex flex-row gap-20 mb-20 -mt-14 "
        >
          <div className="col  rounded-lg h-[500px] w-[400px] shadow-lg">
            <img
              src="pexels-pixelcop-1619858.jpg"
              alt="iot"
              className="h-auto max-h-[100%] w-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="col rounded-lg h-[500px] w-[400px]">
            <img
              src="pexels-jakubzerdzicki-16423102.jpg"
              alt="iot"
              className="h-auto max-h-[100%] w-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="col rounded-lg h-[500px] w-[400px]">
            <img
              src="pexels-vishven-solanki-1441477-2779018.jpg"
              alt="iot"
              className="h-auto max-h-[100%] w-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div id="second-section" className="second-section w-full ">
          <div className="second-sectioh-header w-full bg-indigo-100 px-20 py-10 flex flex-row items-center">
            {" "}
            <h2>Internet of Things IoTs</h2>
          </div>
          <div className="second-section-content h-[20vh]"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
