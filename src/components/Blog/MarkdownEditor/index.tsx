"use client";

import { useState } from "react";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState<string>("# Hello, Markdown!");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };

  const createMarkup = () => {
    const dirty = marked.parse(markdown) as string;
    const clean = DOMPurify.sanitize(dirty);
    return { __html: clean };
  };

  return (
    <div className="flex h-screen flex-col gap-4 bg-[#172135] p-4">
      {/* Markdown Input */}
      <p className="text-secondary-200 article-h3 mt-0 mb-0 font-bold">Input</p>
      <textarea
        className="text-secondary-400 bg-primary mb-4 h-1/2 w-full resize-none rounded p-4 md:h-full"
        value={markdown}
        onChange={handleChange}
        placeholder="Write markdown here..."
      />

      {/* Live HTML Preview */}
      <p className="text-secondary-200 article-h3 mt-0 mb-0 font-bold">
        Output
      </p>
      <div
        className="prose-headings:text-secondary-200 bg-primary h-1/2 w-full overflow-auto rounded border p-4 md:h-full"
        dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  );
};

export default MarkdownEditor;
