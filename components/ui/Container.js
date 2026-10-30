import cx from "./cx";

const SIZE = { sm: "max-w-3xl", md: "max-w-4xl", lg: "max-w-6xl", xl: "max-w-7xl" };

// One content width + gutter pattern for every route.
export default function Container({ size = "lg", as: Tag = "div", className, children, ...rest }) {
  return (
    <Tag className={cx("mx-auto w-full px-4 sm:px-6", SIZE[size] || SIZE.lg, className)} {...rest}>
      {children}
    </Tag>
  );
}
