function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  rounded,
  outline,
  ...rest
}) {
  return <button className="bg-red-500">{children}</button>;
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      return new Error("Only one of the props can be true");
    }
  },
};

export default Button;
