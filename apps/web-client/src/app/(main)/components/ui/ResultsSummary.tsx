interface ResultsSummaryProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  displayedItems: number;
}

export default function ResultsSummary({
  currentPage,
  totalItems,
  itemsPerPage,
  displayedItems,
}: ResultsSummaryProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + displayedItems - 1, totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="mb-6 flex justify-between items-center border-b pb-4">
      <div className="text-sm text-gray-600">
        Showing <span className="font-medium">{startItem}</span> to{' '}
        <span className="font-medium">{endItem}</span> of{' '}
        <span className="font-medium">{totalItems}</span> products
      </div>
      {totalPages > 1 && (
        <div className="text-sm text-gray-500">
          Page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </div>
      )}
    </div>
  );
}
