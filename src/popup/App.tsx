import {
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core";
import { commonValue, targetUrls } from "../CommonValue";
import { HomePage } from "./pages/HomePage";

export const App: React.FC = () => {
  return (
    <MantineProvider withGlobalStyles={true} withNormalizeCSS={true}>
      <Container size={350}>
        <header>
          <Title order={1}>{commonValue.appName}</Title>
          <Box fz="sm">
            <Text>{commonValue.appDescription}</Text>
          </Box>
        </header>
        <Divider my="sm" />
        <HomePage />
        <Divider my="sm" />
        <footer>
          <Group position="center">
            <Anchor
              href={targetUrls.base}
              target="_blank"
              rel="noopener noreferrer"
            >
              Zenn
            </Anchor>
            <Anchor
              href={commonValue.appGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Anchor>
          </Group>
        </footer>
      </Container>
    </MantineProvider>
  );
};
