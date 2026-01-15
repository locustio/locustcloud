"use client";

import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CodeBlock, { Languages } from "components/CodeBlock";
import {
  AI,
  ANY_SERVICE,
  LOOPS,
  OTEL,
  SIMPLE,
} from "components/CodeSample/CodeSample.constants";
import { useState } from "react";
import Motion from "components/Motion";

const snippets: Record<string, { code: string; language?: Languages }> = {
  "HTTP API": { code: SIMPLE },
  "Response validation": { code: LOOPS },
  //   "Import Regular Python Libraries": LIBS,
  "Load Test Any Service": { code: ANY_SERVICE },
  "Open AI": { code: AI },
  OTel: { code: OTEL, language: "bash" },
};

const items = Object.keys(snippets) as (keyof typeof snippets)[];

export default function CodeSample() {
  const [active, setActive] = useState<keyof typeof snippets>(items[0]);
  const activeSnippet = snippets[active];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeSnippet.code);
    } catch {}
  };

  return;
  <Box>
    <Typography sx={{ textAlign: "center", mb: 3 }} variant="h4" component="h2">
      Scenarios in Plain Python
    </Typography>
    <Motion
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ borderRadius: 4, height: 400 }}
      >
        <Box
          sx={{
            display: { md: "grid" },
            gridTemplateColumns: { md: "240px 1fr" },
            height: "100%",
          }}
        >
          <Box
            sx={{
              borderRight: { md: "1px solid" },
              borderColor: { md: "divider" },
            }}
          >
            <List disablePadding>
              {items.map((label) => (
                <ListItemButton
                  component="li"
                  key={label}
                  selected={label === active}
                  onClick={() => setActive(label)}
                  sx={{ borderRadius: 0, py: 2 }}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              ))}
            </List>
          </Box>

          <Paper
            variant="outlined"
            sx={{
              position: "relative",
              overflowX: "scroll",
            }}
          >
            <Box sx={{ position: "absolute", right: 2, top: 2 }}>
              <Tooltip title="Copy">
                <IconButton onClick={handleCopy} aria-label="Copy code">
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <CodeBlock language={activeSnippet.language} showLineNumbers>
              {activeSnippet.code}
            </CodeBlock>
          </Paper>
        </Box>
      </Paper>
    </Motion>
  </Box>;
}
