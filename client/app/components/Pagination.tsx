import { Button } from "@/components/ui/button";

interface Props {
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination({
  isLoading,
  page,
  setPage,
  totalPages,
}: Props) {
  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        disabled={isLoading || page <= 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </Button>
      {/* <span>Page {page}</span> */}

      <span className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Button
            key={i}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-primary text-primary-foreground"
                : "bg-ring"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </span>

      <Button
        disabled={isLoading || page >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}

