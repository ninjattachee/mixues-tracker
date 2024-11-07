import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Card, Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { Text } from "@radix-ui/themes/dist/esm/components/callout.js";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="4">
        <Flex gap="4" justify="between">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
            <Text
              size="2"
              className="text-muted-foreground max-w-60 hidden sm:block"
              weight="medium"
            >
              Mixues is an issue tracker for Mixin Network and Mixin Messenger
            </Text>
        </Flex>
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Mixues - Dashboard",
  description: "Issue tracking app for Mixin Network and Mixin Messenger",
};
