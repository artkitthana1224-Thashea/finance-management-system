
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const calculateInterest = (principal: number, monthlyRate: number, days: number = 30) => {
  // Simple monthly interest: (Principal * Rate / 100)
  // For precise days: (Principal * (Rate/100) * (Days/30))
  return principal * (monthlyRate / 100) * (days / 30);
};

export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
