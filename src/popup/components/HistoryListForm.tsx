import { Button, Group, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

type Props = {
  onChange: (value: string) => void;
};

export const HistoryListForm = React.memo<Props>(({ onChange }) => {
  const [keyword, setKeyword] = useState("");
  const [debounced] = useDebouncedValue(keyword, 500);

  // キーワードの入力が一定時間なかった時に呼び出される
  useEffect(() => {
    onChange(debounced);
  }, [debounced]);

  // クリアボタンを押下した時のイベント
  const handleClear = () => {
    setKeyword("");
  };

  return (
    <Group mt="md">
      <TextInput
        value={keyword}
        onChange={(e) => setKeyword(e.currentTarget.value)}
        autoFocus={true}
        autoComplete="off"
        placeholder="キーワード"
      />
      <Button color="gray" onClick={handleClear} disabled={keyword.length < 1}>
        クリア
      </Button>
    </Group>
  );
});
