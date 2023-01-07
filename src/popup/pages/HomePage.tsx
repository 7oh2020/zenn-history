import { Box, Button, Group, List, Text, Title } from "@mantine/core";
import { HistoryListForm } from "../components/HistoryListForm";
import { HistoryListItem } from "../components/HistoryListItem";
import { useHistoryData } from "../hooks/UseHistoryData";
import { useKeywordData } from "../hooks/UseKeywordData";

export const HomePage: React.FC = () => {
  const { keyword, handleChangeKeyword } = useKeywordData();
  const { histories, handleClearHistories } = useHistoryData(keyword);

  return (
    <>
      <Title order={2}>履歴</Title>
      <HistoryListForm onChange={handleChangeKeyword} />

      <main>
        {histories.length > 0 && (
          <List sx={{ listStyle: "none" }} mt="md">
            {histories.map((history) => (
              <HistoryListItem key={history.url} history={history} />
            ))}
          </List>
        )}
        {histories.length < 1 && (
          <Box ta="center">
            <Text>履歴はまだありません</Text>
          </Box>
        )}
      </main>

      <Group position="center" mt="md">
        <Button
          color="red"
          onClick={handleClearHistories}
          disabled={histories.length < 1}
        >
          履歴データを全て削除
        </Button>
      </Group>
    </>
  );
};
