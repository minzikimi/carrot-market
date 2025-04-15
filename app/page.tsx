export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5">
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-4">
        {["tomato", "potato", "onion", "garlic", ""].map((vegetable, index) => (
          <div key={index} className="flex items-center gap-5">
            {/* Circle */}
            <div className="w-10 h-10 bg-blue-400 rounded-full" />
            {/* Name */}
            <span className={`text-lg font-medium ${!vegetable ? 'w-24 h-5 rounded-full animate-pulse bg-gray-300' : ''}`}>
              {vegetable}
            </span>
            {/* Index with Ping Effect */}
            <div className="relative w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full">
              <span className="z-10">{index}</span>
              <div className="absolute w-full h-full bg-red-500 rounded-full animate-ping" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
