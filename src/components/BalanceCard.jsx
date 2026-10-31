import React from 'react';
import { formatCurrency } from '../utils/formatters';

const VARIANT_STYLES = {
  indigo: {
    border: 'border-indigo-100',
    bg: 'bg-white',
    iconBg: 'bg-indigo-50 text-indigo-600',
    amountColor: 'text-slate-900',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-150',
  },
  emerald: {
    border: 'border-emerald-100',
    bg: 'bg-white',
    iconBg: 'bg-emerald-50 text-emerald-600',
    amountColor: 'text-slate-900',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-150',
  },
  rose: {
    border: 'border-rose-100',
    bg: 'bg-white',
    iconBg: 'bg-rose-50 text-rose-600',
    amountColor: 'text-slate-900',
    badge: 'bg-rose-50 text-rose-700 border-rose-150',
  },
};

/**
 * Reusable BalanceCard component to display financial metrics
 * @param {Object} props
 * @param {string} props.title - Card title / label
 * @param {number} props.amount - Numeric balance or metric
 * @param {React.ComponentType} [props.icon] - Lucide icon component
 * @param {'indigo'|'emerald'|'rose'} [props.variant] - Visual accent style
 * @param {string} [props.subtitle] - Supporting description or trend note
 * @param {string} [props.badge] - Optional pill label
 */
const BalanceCard = ({
  title,
  amount = 0,
  icon: Icon,
  variant = 'indigo',
  subtitle,
  badge,
}) => {
  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.indigo;

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 shadow-sm border ${styles.border} ${styles.bg} transition-all hover:shadow-md duration-200 flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-500 uppercase">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 sm:p-2.5 rounded-xl ${styles.iconBg} shadow-xs`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between sm:justify-start gap-2.5 flex-wrap">
          <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight break-words ${styles.amountColor}`}>
            {formatCurrency(amount)}
          </span>
          {badge && (
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${styles.badge}`}>
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-2 text-xs text-slate-500 font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default BalanceCard;
