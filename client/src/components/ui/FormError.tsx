// components/ui/FormError.tsx

import React from "react";

const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return <p className="text-sm font-medium text-destructive mt-1">{message}</p>;
};

export default FormError;
