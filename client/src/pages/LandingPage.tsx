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
          backgroundSize: "cover",
          backgroundBlendMode: "soft-light",
          backgroundColor: "#323232",
        }}
      >
        <h1 className="text-indigo-400 text-6xl font-bold animate-pulse">
          Welcome ITPE4 IoT Middleware!
        </h1>
        <p className="text-indigo-600 animate-bounce">
          A website for connecting IoT to software
        </p>
        <button className="bg-indigo-400 px-10 py-2 text-white text-2xl rounded-sm transition-transform duration-300 ease-in-out hover:bg-indigo-500 hover:scale-105"
          onClick={() => navigate("/Video-stream")}>
          Get Started!
        </button>
      </div>
      <div className="landing-page-content  flex flex-col items-center w-full">
        <div
          id="first-section"
          className="first-section flex flex-row gap-20 mb-12 "
        >
          <div className="col  rounded-lg h-[500px] w-[400px] shadow-lg">
            <img
              src="pexels-pixelcop-1619858.jpg"
              alt="iot"
              className="h-auto max-h-[100%] w-full object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
            />
          </div>
          <div className="col rounded-lg h-[500px] w-[400px]">
            <img
              src="pexels-jakubzerdzicki-16423102.jpg"
              alt="iot"
              className="h-auto max-h-[100%] w-full object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
            />
          </div>
          <div className="col rounded-lg h-[500px] w-[400px]">
            <img
              src="pexels-vishven-solanki-1441477-2779018.jpg"
              alt="iot"
              className="h-auto max-h-[100%] w-full object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
            />
          </div>
        </div>

        <div id="second-section" className="second-section w-full ">
        <div className="second-section-header w-full bg-indigo-100 px-20 py-10 flex items-center justify-center">
          <h2 className="text-center">Internet of Things (IoTs)</h2>
        </div>
          <div className="second-section-content px-20 py-5 w-full mt-6">
            <div className="flex flex-col gap-7 w-3/5 mx-auto text-center">
              <p className="text-lg">
                The Internet of Things (IoT) refers to the interconnected nature
                of devices that communicate with each other via the internet.
                This revolutionary technology transforms everyday objects into
                smart devices, enabling them to collect and share data
                seamlessly.
              </p>
              <p className="text-lg">
                By leveraging IoT solutions, businesses can improve efficiency,
                enhance user experiences, and create innovative services. From
                smart homes to industrial automation, the applications of IoT
                are vast and transformative.
              </p>
              <p className="text-lg">
                Join us in exploring the endless possibilities of IoT and
                discover how we can help you connect your devices to the
                software that powers your operations.
              </p>
            </div>
            <div className="col w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
