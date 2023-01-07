import { Anchor, Badge, Group, List, Text, Title } from "@mantine/core";
import { HistoryItem } from "../types/BucketData";

type Props = {
  history: HistoryItem;
};

export const HistoryListItem: React.FC<Props> = ({ history }) => {
  return (
    <List.Item>
      <Title order={3}>
        <Anchor href={history.url} target="_blank" rel="noopener noreferrer">
          {history.title}
        </Anchor>
      </Title>
      <Group>
        <Badge fz="sm" color="blue">
          {history.type}
        </Badge>
        <Text fz="sm">{history.createdAt}</Text>
      </Group>
    </List.Item>
  );
};
