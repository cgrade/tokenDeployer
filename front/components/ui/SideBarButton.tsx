import Button from "./Button";

interface SidebarButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  active,
  onClick,
  icon,
  label,
}) => (
  <Button
    variant="ghost"
    className={`w-full justify-start gap-3 text-white hover:bg-gray-700 mb-1 ${
      active ? "bg-gray-700" : ""
    }`}
    onClick={onClick}
  >
    {icon}
    {label}
  </Button>
);

export default SidebarButton;
