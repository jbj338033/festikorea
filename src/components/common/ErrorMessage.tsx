import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
      <p className="text-red-700 text-sm mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-hover transition-colors text-sm"
        >
          {t('common.retry')}
        </button>
      )}
    </div>
  );
}
