const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="border rounded p-2 bg-gray-700 text-white focus:border-blue-500 focus:ring focus:ring-blue-500"
    />
  );
};

export default Input;
