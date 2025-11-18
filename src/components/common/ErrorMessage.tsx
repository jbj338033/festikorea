import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p className="text-red-800 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
        >
          {t('common.retry')}
        </button>
      )}
    </div>
  );
}
