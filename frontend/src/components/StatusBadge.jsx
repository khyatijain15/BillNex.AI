import React from 'react'
const StatusIcons = {
  paid: ({ className = "w-3 h-3" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  unpaid: ({ className = "w-3 h-3" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  overdue: ({ className = "w-3 h-3" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  draft: ({ className = "w-3 h-3" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};


const StatusBadge = ({status=" ",size="default",showIcon=true}) => {
   const s = (status || "").toLowerCase();

   const statusConfig = {
    paid: {
      bg: "bg-[var(--color-paid-bg)]",
      text: "text-[var(--color-paid)]",
      border: "border-[rgba(74,122,90,0.15)]",
    },
    unpaid: {
      bg: "bg-[var(--color-unpaid-bg)]",
      text: "text-[var(--color-unpaid)]",
      border: "border-[rgba(168,78,34,0.15)]",
    },
    overdue: {
      bg: "bg-[var(--color-unpaid-bg)] opacity-90",
      text: "text-[var(--color-unpaid)]",
      border: "border-[rgba(168,78,34,0.15)]",
    },
    draft: {
      bg: "bg-[var(--color-bg-surface)]",
      text: "text-[var(--color-ink-600)]",
      border: "border-[var(--color-border)]",
    },
    default: {
      bg: "bg-[var(--color-bg-surface)]",
      text: "text-[var(--color-ink-600)]",
      border: "border-[var(--color-border)]",
    },
  };

  const config=statusConfig[s] || statusConfig.default;

  return (
    <div 
    className={`inline-flex items-center rounded-[20px] font-[var(--font-body)] tracking-[0.07em] uppercase text-[9.5px] px-[9px] py-[3px] gap-1.5 ${config.bg} ${config.text} border ${config.border} transition-all duration-300 ease-out`}
    >
        <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
        <span className="relative z-10">
            {s==="default" ? status:s}
        </span>
    </div>
  )
};

//status with count
export function StatusWithCount({status,count,size="default"}){
    return (
        <div className='inline-flex items-center gap-2 group'>
            <StatusBadge status={status} size={size} />

        {count !==undefined && (
            <span 
            className='text-xs text-gray-500 font-medium bg-grey-100
            px-2 py-1 rounded-full group-hover:bg-gray-200 transition-colors duration-200'
            >{count}</span>
        )}

        </div>
    )
}

export default StatusBadge
