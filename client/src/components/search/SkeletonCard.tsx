const SkeletonCard = () => (
  <div className="border bg-card text-card-foreground rounded-lg shadow-sm flex flex-col md:flex-row animate-pulse">
    <div className="p-4 md:w-1/3 flex flex-col items-center text-center border-b md:border-b-0 md:border-r">
      <div className="h-20 w-20 rounded-full bg-muted mb-3"></div>
      <div className="h-5 w-24 bg-muted rounded-md mb-2"></div>
      <div className="h-4 w-32 bg-muted rounded-md"></div>
    </div>
    <div className="p-4 flex-1 flex flex-col">
      <div className="flex-grow space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-center w-1/3">
            <div className="h-4 w-12 bg-muted rounded-md mx-auto mb-1"></div>
            <div className="h-6 w-20 bg-muted rounded-md mx-auto"></div>
          </div>
          <div className="h-5 w-5 bg-muted rounded-full mx-4"></div>
          <div className="text-center w-1/3">
            <div className="h-4 w-8 bg-muted rounded-md mx-auto mb-1"></div>
            <div className="h-6 w-24 bg-muted rounded-md mx-auto"></div>
          </div>
        </div>
        <div className="space-y-2 border-t border-b py-2">
          <div className="h-4 w-1/2 bg-muted rounded-md mx-auto"></div>
          <div className="h-4 w-2/3 bg-muted rounded-md mx-auto"></div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-11 w-full bg-muted rounded-md"></div>
        <div className="h-11 w-11 bg-muted rounded-md"></div>
      </div>
    </div>
  </div>
);

export default SkeletonCard;
