import { Link } from 'react-router-dom';
import Button from './Button';

interface CardProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

const Card = ({ id, title, content, createdAt, onDelete }: CardProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString();
  
  // Truncate content if it's too long
  const truncatedContent = content.length > 150 
    ? content.substring(0, 150) + '...' 
    : content;

  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition duration-200">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500 text-sm mb-3">Published on {formattedDate}</p>
      <p className="text-gray-700 mb-4">{truncatedContent}</p>
      
      <div className="flex justify-end space-x-3">
        <Link to={`/posts/${id}`}>
          <Button variant="secondary">View</Button>
        </Link>
        <Link to={`/posts/edit/${id}`}>
          <Button variant="primary">Edit</Button>
        </Link>
        <Button 
          variant="danger" 
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Card; 