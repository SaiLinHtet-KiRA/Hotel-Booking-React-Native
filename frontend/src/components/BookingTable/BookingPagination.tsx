interface BookingPaginationProps {
  page: number;
  limit: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export default function BookingPagination({
  page,
  limit,
  hasMore,
  onPageChange,
  loading,
}: BookingPaginationProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg border border-slate-200 px-4 py-3">
      <span className="text-sm text-slate-500">
        Page {page + 1} · {limit} per page
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0 || loading}
          className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasMore || loading}
          className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
