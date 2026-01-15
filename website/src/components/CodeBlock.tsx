"use client";

import { useColorScheme } from "@mui/material";
import { THEME_MODE } from "constants/theme";
import {
  Light as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import atomOneDark from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";
import atomOneLight from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-light";

SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("bash", bash);
const SyntaxHighlighterComponent = SyntaxHighlighter;

export type Languages = "bash" | "python";

interface ICodeBlock extends Partial<SyntaxHighlighterProps> {
  children: string | string[];
  customStyle?: Record<string, string | number>;
  language?: Languages;
}

export default function CodeBlock({
  children,
  customStyle,
  language = "python",
  ...props
}: ICodeBlock) {
  const { colorScheme } = useColorScheme();

  return (
    <SyntaxHighlighterComponent
      {...props}
      customStyle={{
        margin: 0,
        padding: 16,
        background: "transparent",
        fontSize: 14,
        height: "100%",
        ...customStyle,
      }}
      wrapLines
      language={language}
      style={colorScheme === THEME_MODE.DARK ? atomOneDark : atomOneLight}
    >
      {children}
    </SyntaxHighlighterComponent>
  );
}
