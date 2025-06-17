import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  generateUrl: (page: number) => string;
}

export default function Pagination({
  currentPage,
  totalPages,
  generateUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  // Calculate start and end page numbers
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Add pages to the array
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination Navigation">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={generateUrl(currentPage - 1)}
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-ring px-3 py-2 text-sm"
          aria-label={`Go to page ${currentPage - 1}`}
        >
          Previous
        </Link>
      ) : (
        <span 
          className="inline-flex items-center justify-center rounded-md font-medium px-3 py-2 text-sm opacity-50 cursor-not-allowed border border-input bg-background text-foreground"
          aria-label="Previous page (disabled)"
        >
          Previous
        </span>
      )}

      {/* First page and ellipsis */}
      {startPage > 1 && (
        <>
          <Link
            href={generateUrl(1)}
            className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background px-3 py-2 text-sm ${
              1 === currentPage
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring'
                : 'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-ring'
            }`}
            aria-label="Go to page 1"
            aria-current={1 === currentPage ? 'page' : undefined}
          >
            1
          </Link>
          {startPage > 2 && (
            <span className="px-2 py-2 text-muted-foreground" aria-hidden="true">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={generateUrl(page)}
          className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background px-3 py-2 text-sm ${
            page === currentPage
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring'
              : 'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-ring'
          }`}
          aria-label={`Go to page ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      {/* Last page and ellipsis */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 py-2 text-muted-foreground" aria-hidden="true">...</span>
          )}
          <Link
            href={generateUrl(totalPages)}
            className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background px-3 py-2 text-sm ${
              totalPages === currentPage
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring'
                : 'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-ring'
            }`}
            aria-label={`Go to page ${totalPages}`}
            aria-current={totalPages === currentPage ? 'page' : undefined}
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={generateUrl(currentPage + 1)}
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-ring px-3 py-2 text-sm"
          aria-label={`Go to page ${currentPage + 1}`}
        >
          Next
        </Link>
      ) : (
        <span 
          className="inline-flex items-center justify-center rounded-md font-medium px-3 py-2 text-sm opacity-50 cursor-not-allowed border border-input bg-background text-foreground"
          aria-label="Next page (disabled)"
        >
          Next
        </span>
      )}
    </nav>
  );
}
