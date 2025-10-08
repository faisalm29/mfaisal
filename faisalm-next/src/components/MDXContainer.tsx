import AnchorLink from "./AnchorLink";
import { RiHashtag } from "@remixicon/react";

const MDXContainer = {
  a: ({ ...props }) => {
    if (props.href.startsWith("#")) {
      return (
        <a
          {...props}
          href={props.href}
          className="absolute top-0 right-0 bottom-0 -left-4 mt-auto mb-auto flex w-fit -translate-x-1/2 flex-col items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
        >
          <RiHashtag className="text-secondary-200 hidden md:inline" />
        </a>
      );
    }
    return (
      <AnchorLink href={props.href} target="_blank">
        {props.children}
      </AnchorLink>
    );
  },
  h2: ({ ...props }) => (
    <h2
      {...props}
      data-heading
      className="group not-prose text-secondary-200 article-h2 relative scroll-mt-[82px] font-bold"
    />
  ),
  h3: ({ ...props }) => (
    <h3
      {...props}
      data-heading
      className="group not-prose not-prose text-secondary-200 article-h3 relative scroll-mt-[82px] font-bold"
    />
  ),
  input: ({ ...props }) => {
    if (props.type === "checkbox" && props.disabled && !props.checked) {
      return (
        <input
          {...props}
          readOnly
          type="checkbox"
          disabled
          className="form-checkbox rounded bg-gray-500"
        />
      );
    }
    if (props.type === "checkbox" && props.disabled && props.checked) {
      return (
        <input
          {...props}
          readOnly
          type="checkbox"
          disabled
          checked
          className="form-checkbox rounded text-gray-500"
        />
      );
    }
    return <input type="checkbox" />;
  },
  code: ({ ...props }) => <code {...props} className="not-prose" />,
  blockquote: ({ ...props }) => (
    <blockquote
      {...props}
      className="not-prose text-secondary-400 border-l-accent border-l-4 py-2 pl-8 italic"
    />
  ),
  table: ({ ...props }) => (
    <div className="overflow-x-auto">
      <table {...props} className="prose table-fix w-full overflow-scroll" />
    </div>
  ),
};

export default MDXContainer;
