interface HeadingProps {
  title: string;
  subtitle?: string;
}

const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
    </div>
  );
};

export default Heading