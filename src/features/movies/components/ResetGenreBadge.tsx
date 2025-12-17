import { RiDeleteBinLine } from "react-icons/ri";

interface Props {
  onReset: () => void;
}

export const ResetGenreBadge = ({ onReset }: Props) => {
  return (
    <li>
      <button
        id="reset-filter-btn"
        onClick={onReset}
        className="w-fit rounded-full bg-red-100 px-4 py-0.5 text-red-400"
      >
        <span className="flex items-center gap-2">
          <RiDeleteBinLine /> Reset
        </span>
      </button>
    </li>
  );
};
