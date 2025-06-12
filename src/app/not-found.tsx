import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-8">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link 
          href="/"
          className="bg-white text-black px-6 py-3 text-lg font-medium hover:bg-gray-200 transition-colors rounded-lg"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
} 