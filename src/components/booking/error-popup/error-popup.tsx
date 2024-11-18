import React from 'react';

type ErrorPopupProps = {
  isOpen?: boolean;
};

const ErrorPopup = ({ isOpen = false }: ErrorPopupProps) => {
  return <div>ErrorPopup</div>;
};

export default ErrorPopup;
