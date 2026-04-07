/**
 * Extracts plain text from a content string that could be:
 * 1. A JSON stringified array of Slate.js nodes
 * 2. An HTML string
 * 3. A plain text string
 * 
 * @param content The content string to process
 * @returns Cleaned plain text
 */
export const extractPlainText = (content: string): string => {
  if (!content) return "";

  try {
    // Check if it's potentially a JSON array (Slate.js content starts with [ and ends with ])
    const trimmedContent = content.trim();
    if (trimmedContent.startsWith("[") && trimmedContent.endsWith("]")) {
      const parsed = JSON.parse(trimmedContent);
      
      // Recursive helper to extract text from Slate.js node structure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const extractFromNodes = (nodes: any[]): string => {
        if (!Array.isArray(nodes)) return "";
        return nodes
          .map((node) => {
            if (typeof node.text === "string") return node.text;
            if (node.children) return extractFromNodes(node.children);
            return "";
          })
          .join(" ");
      };

      const text = extractFromNodes(parsed);
      if (text) return text.trim().replace(/\s+/g, " ");
    }
  } catch (error) {
    // If JSON parsing fails, we treat it as potentially HTML or plain text
  }

  // Fallback: strip HTML tags and normalize whitespace
  return content
    .replace(/<[^>]*>/g, " ") // Replace tags with space to avoid merging words
    .replace(/\s+/g, " ")      // Normalize multiple spaces
    .trim();
};
