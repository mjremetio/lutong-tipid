import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <span className="text-7xl" role="img" aria-label="Confused face">
        😵
      </span>

      <h1 className="mt-6 font-heading text-3xl font-bold text-forest-800">
        Naku! Page not found
      </h1>

      <p className="mt-3 max-w-md font-body text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist. It might have been
        moved or the URL may be incorrect.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block rounded-2xl bg-forest-600 px-6 py-3 font-bold text-white shadow transition hover:bg-forest-500 active:scale-[0.98]"
      >
        Back to Home
      </Link>
    </div>
  );
}
