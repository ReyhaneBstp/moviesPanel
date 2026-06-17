export default function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
      <p>{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-md bg-red-100 text-red-700 hover:bg-red-200"
        >
          تلاش مجدد
        </button>
      )}
    </div>
  );
}
