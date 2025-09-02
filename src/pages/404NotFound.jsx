export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-lg mt-4">Halaman tidak ditemukan</p>
      <a 
        href="/" 
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Kembali ke Home
      </a>
    </div>
  );
}
