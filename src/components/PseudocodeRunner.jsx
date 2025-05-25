import * as monaco from "monaco-editor";

// Define Pseudocode language for Monaco Editor
export function registerPseudocodeLanguage() {
  // Register a new language
  monaco.languages.register({ id: "pseudocode" });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider("pseudocode", {
    tokenizer: {
      root: [
        // Keywords
        [/\b(if|else|while|for|return|function|var|print|input)\b/, "keyword"],

        // Control keywords
        [/\b(begin|end|then|do|to|downto|step)\b/, "keyword.control"],

        // Function-related keywords
        [/\b(function|end function|return)\b/, "keyword.function"],

        // Loop-related keywords
        [/\b(for|while|do|to|end for|end while)\b/, "keyword.loop"],

        // Conditional keywords
        [/\b(if|then|else|end if)\b/, "keyword.conditional"],

        // Operators
        [/[+\-*/=<>!&|^~]/, "operator"],

        // Numbers
        [/\d+/, "number"],

        // Strings
        [/"[^"]*"/, "string"],
        [/'[^']*'/, "string"],

        // Comments
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@comment"],

        // Function calls
        [
          /([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/,
          ["function", { token: "", next: "@parameters" }],
        ],
      ],
      comment: [
        [/[^/*]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[/*]/, "comment"],
      ],
      parameters: [
        [/\)/, { token: "", next: "@pop" }],
        [/,/, "delimiter"],
        [/"[^"]*"/, "string"],
        [/'[^']*'/, "string"],
        [/\d+/, "number"],
        [/[a-zA-Z_][a-zA-Z0-9_]*/, "variable"],
      ],
    },
  });

  // Define the completion provider
  monaco.languages.registerCompletionItemProvider("pseudocode", {
    provideCompletionItems: () => {
      return {
        suggestions: [
          {
            label: "if",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "if ${1:condition} then\n\t${2}\nend if",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: "while",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: "while ${1:condition} do\n\t${2}\nend while",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: "for",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText:
              "for ${1:variable} = ${2:start} to ${3:end} do\n\t${4}\nend for",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: "function",
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText:
              "function ${1:name}(${2:parameters})\n\t${3}\nend function",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: "print",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "print ${1:expression}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: "input",
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: "input ${1:variable}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
        ],
      };
    },
  });
}
