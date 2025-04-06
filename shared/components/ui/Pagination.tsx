import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-between mt-6 px-2">
      <Button
        variant="ghost"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        이전
      </Button>

      <div className="text-sm text-muted-foreground">
        페이지 <span className="font-medium text-foreground">{page}</span> / {totalPages}
      </div>

      <Button
        variant="ghost"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="gap-1"
      >
        다음
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}