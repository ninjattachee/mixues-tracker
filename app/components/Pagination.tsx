"use client";

import {
  ChevronLeftIcon,
  DoubleArrowRightIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex mt="4" justify="end" align="center" gap="3">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Flex gap="2">
        <Button
          size="2"
          color="gray"
          variant="ghost"
          disabled={currentPage === 1}
          onClick={() => {
            changePage(1);
          }}
        >
          <DoubleArrowLeftIcon />
        </Button>
        <Button
          size="2"
          color="gray"
          variant="ghost"
          disabled={currentPage === 1}
          onClick={() => {
            changePage(currentPage - 1);
          }}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          size="2"
          color="gray"
          variant="ghost"
          disabled={currentPage === pageCount}
          onClick={() => {
            changePage(currentPage + 1);
          }}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          size="2"
          color="gray"
          variant="ghost"
          disabled={currentPage === pageCount}
          onClick={() => {
            changePage(pageCount);
          }}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
