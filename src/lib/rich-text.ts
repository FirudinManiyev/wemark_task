import sanitizeHtml from "sanitize-html";

const options: sanitizeHtml.IOptions = {
  allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li", "a", "h3"],
  allowedAttributes: { a: ["href"] },
  allowedSchemes: ["https", "http"],
  disallowedTagsMode: "discard",
};

export function cleanRichText(html: string): string {
  const withoutBlankParagraphs = html.replace(
    /<p>(?:\s|&nbsp;|<br\s*\/?\s*>)*<\/p>/gi,
    "",
  );

  return sanitizeHtml(withoutBlankParagraphs, options).replace(
    /<p>\s*(?:<br\s*\/?\s*>)?\s*((?:<strong>[^<]+<\/strong>\s*){1,2})<\/p>/gi,
    "<h3>$1</h3>",
  );
}
