import React from 'react';

export default function LandingFooter({ data }) {
  if (!data?.sections?.footer || !data.sections.footer.enabled) {
    return null;
  }

  const footerData = data.sections.footer;
  const siteData = data.sections.site;

  const regionLabel = siteData?.regionLabel || 'Alwarpet';
  const phoneDisplay = siteData?.phone?.display || '080 695 49251';

  return (
    <footer className="bg-gray-900 text-gray-400 py-3 px-4 border-t border-gray-800 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-0.5">
        <p className="text-xs sm:text-sm text-gray-300 leading-snug hidden sm:block">
          © 2026 {siteData?.hospitalName || 'Motherhood Hospital Chennai'} · {regionLabel} · {phoneDisplay}
        </p>

        <p className="text-xs text-gray-300 leading-snug sm:hidden">
          © 2026 {siteData?.hospitalName || 'Motherhood Hospital Chennai'}
        </p>
        <p className="text-xs text-gray-300 leading-snug sm:hidden">
          {regionLabel} · {phoneDisplay}
        </p>

        <div className="hidden md:flex items-center justify-center gap-2 text-xs leading-snug">
          {footerData.privacyPolicyText && (
            <a href="/privacy-policy" className="hover:text-white transition-colors">
              {footerData.privacyPolicyText}
            </a>
          )}
          {footerData.privacyPolicyText && footerData.termsConditionsText && (
            <span className="text-gray-600">|</span>
          )}
          {footerData.termsConditionsText && (
            <a href="/terms-conditions" className="hover:text-white transition-colors">
              {footerData.termsConditionsText}
            </a>
          )}
        </div>

      </div>
    </footer>
  );
}