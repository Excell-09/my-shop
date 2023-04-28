import { ErrorMessage } from '../../typing';

export default function Alert({ message, type }: ErrorMessage) {
  const STATUS_ERROR = {
    error: 'bg-red-200 border-red-500 text-red-500',
    success: 'bg-green-200 border-green-500 text-green-500',
  };
  return (
    <>
      {message !== '' && (
        <div className={`${STATUS_ERROR[type || 'error']} border-2 py-2 text-lg`}>{message}</div>
      )}
    </>
  );
}
