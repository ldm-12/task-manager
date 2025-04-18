import { Badge } from "@mantine/core";
import { StatusTypes } from "../types";

const StatusBadge = ({ status }: { status: StatusTypes }) => {
  const colours = {
    "Not started": "gray",
    "In progress": "cyan",
    "Complete": "green",
    "Blocked": "red",
  };

  return (
    <Badge color={colours[status]} radius="sm">
      {status}
    </Badge>
  );
};

export default StatusBadge;
