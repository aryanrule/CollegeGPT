function BasicPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      <div className="bg-white p-8 rounded-2xl shadow-md w-[350px]">
        
        <h1 className="text-2xl font-semibold text-center mb-6">
          Welcome to <span className="text-purple-500">CollegeGPT</span>
        </h1>

        <input
          type="text"
          placeholder="Enter something..."
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
          Submit
        </button>

      </div>

    </div>
  );
}

export default BasicPage;