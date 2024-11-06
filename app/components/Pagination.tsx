import { ChevronLeftIcon, DoubleArrowRightIcon, ChevronRightIcon, DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

interface PaginationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: PaginationProps) => {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="3">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Flex gap="2">
        <Button
          size="2"
          color="gray"
          variant="ghost"
          disabled={currentPage === 1}
        >
          <DoubleArrowLeftIcon />
        </Button>
        <Button size="2" color="gray" variant="ghost" disabled={currentPage === 1}
>
          <ChevronLeftIcon />
        </Button>
        <Button size="2" color="gray" variant="ghost" disabled={currentPage === pageCount}>
          <ChevronRightIcon />
        </Button>
        <Button size="2" color="gray" variant="ghost" disabled={currentPage === pageCount}>
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
