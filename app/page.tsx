export default function Home() {
  return (
    <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5">
    <form className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col md:flex-row gap-2 *:outline-none has-[.peer]:bg-green-100 ring ring-transparent transition-shadow has-[:invalid]:ring-red-100" >
    <input
      className="peer w-full rounded-full h-10 bg-gray-200 pl-5  ring ring-transparent focus:ring-orange-500 focus:ring-offset-2 transition-shadow placeholder:drop-shadow invalid:focus:ring-red-500"
      type="email"
      placeholder="Search here..."
      required
    />
    <span className="text-red-500 hidden peer-invalid:block">email is required</span>
    <button className="bg-black text-white py-2 rounded-full active:scale-90 transition-transform font-medium  md:px-10 bg-gradient-to-tr from-cyan-400 via-yellow-400 to-purple-300 peer-invalid:from-red-400 peer-invalid:to-orange-400">
     login
    </button>
  </form>
  </main>
);
}