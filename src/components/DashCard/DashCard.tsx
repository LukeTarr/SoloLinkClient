type DashCardProps = {
  icon: React.ReactElement;
  title: string;
  subtext: string;
  component: () => void;
};

const DashCard = ({ icon, title, subtext, component }: DashCardProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 w-3/4 h-1/6 md:w-1/4 md:h-1/4 bg-gray-400 m-8 rounded-xl shadow-2xl flex-nowrap cursor-pointer"
      onClick={component}
    >
      {icon && icon}
      <h3 className="text-2xl mt-4">{title}</h3>
      <h3 className="text mt-4">{subtext}</h3>
    </div>
  );
};

export default DashCard;
