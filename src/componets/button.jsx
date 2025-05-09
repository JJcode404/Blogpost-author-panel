// src/components/ui/button.jsx
import classNames from "classnames";

function Button({ children, className, ...props }) {
  return (
    <button
      className={classNames(
        "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
export { Button };
