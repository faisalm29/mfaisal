"use client";

import { RiCheckFill, RiClipboardFill } from "@remixicon/react";
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from "react";

const Pre = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLElement>(null);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };
  return (
    <div className="relative">
      <button
        disabled={isCopied}
        onClick={handleClickCopy}
        className="absolute top-4 right-4 z-10 size-6"
      >
        {isCopied ? (
          <RiCheckFill className="text-green-400" />
        ) : (
          <RiClipboardFill />
        )}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
};

export default Pre;
