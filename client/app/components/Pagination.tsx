import { Button } from "@/app/components/ui/button";


interface Props {
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function Pagination({ isLoading, page, setPage, totalPages }: Props) {
  const generatePageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  const handleDotsClick = (direction: "left" | "right") => {
    if (direction === "left") {
      setPage(Math.max(1, page - 3));
    } else {
      setPage(Math.min(totalPages, page + 3));
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <Button disabled={isLoading || page <= 1} onClick={() => setPage(page - 1)}>
        Prev
      </Button>

      <span className="flex justify-center space-x-2">
        {pages.map((p, i) =>
          p === "..." ? (
            <Button
              key={`dots-${i}`}
              className="px-3 py-1 bg-muted cursor-pointer"
              onClick={() => handleDotsClick(i === 1 ? "left" : "right")}
            >
              ...
            </Button>
          ) : (
            <Button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded ${
                page === p ? "bg-primary text-primary-foreground" : "bg-ring"
              }`}
            >
              {p}
            </Button>
          )
        )}
      </span>

      <Button disabled={isLoading || page >= totalPages} onClick={() => setPage(page + 1)}>
        Next
      </Button>
    </div>
  );
}






// interface Props {
//   isLoading: boolean;
//   page: number;
//   setPage: (page: number) => void;
//   totalPages: number;
// }

// export default function Pagination({
//   isLoading,
//   page,
//   setPage,
//   totalPages,
// }: Props) {
//   return (
//     <div className="flex justify-center items-center space-x-2">
//       <Button
//         disabled={isLoading || page <= 1}
//         onClick={() => setPage(page - 1)}
//       >
//         Prev
//       </Button>
//       {/* <span>Page {page}</span> */}

//       <span className="flex justify-center space-x-2">
//         {Array.from({ length: totalPages }).map((_, i) => (
//           <Button
//             key={i}
//             className={`px-3 py-1 rounded ${
//               page === i + 1 ? "bg-primary text-primary-foreground" : "bg-ring"
//             }`}
//             onClick={() => setPage(i + 1)}
//           >
//             {i + 1}
//           </Button>
//         ))}
//       </span>

//       <Button
//         disabled={isLoading || page >= totalPages}
//         onClick={() => setPage(page + 1)}
//       >
//         Next
//       </Button>
//     </div>
//   );
// }
