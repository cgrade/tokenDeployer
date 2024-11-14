const Label: React.FC<{ children: React.ReactNode; [key: string]: any }> = ({
  children,
  ...props
}) => {
  return (
    <label {...props} className="block text-sm font-medium text-gray-300 mb-2">
      {children}
    </label>
  );
};

export default Label;
