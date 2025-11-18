import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">
          {t('footer.copyright')} {t('footer.teamProject')}
        </p>
      </div>
    </footer>
  );
}
