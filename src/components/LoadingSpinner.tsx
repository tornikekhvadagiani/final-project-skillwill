interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'იტვირთება...' }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      <span className="ml-4 text-lg text-gray-600">{message}</span>
    </div>
  );
} 