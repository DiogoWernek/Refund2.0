import { classMerge } from "../utils/classMerge";

type ButtonProps = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "base" | "icon" | "iconSmall";
};

const variants = {
  button: {
    base: "h-12",
    icon: "h-12 w-12",
    iconSmall: "h-8 w-8",
  },
};

export const Button = ({
  children,
  isLoading,
  className,
  type = "button",
  variant = "base",
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={classMerge([
        "flex items-center justify-center bg-green-100 rounded-lg text-white cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50",
        variants.button[variant],
        className,
        isLoading && "cursor-progress"
      ])}
      {...rest}
    >
      {children}
    </button>
  );
};
