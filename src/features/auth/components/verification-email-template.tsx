import * as React from 'react';

interface EmailTemplateProps {
    code: string;
}

export function VerificationEmailTemplate({ code }: EmailTemplateProps) {
  return (
    <div>
      <h1>Your verification code is: {code}</h1>
    </div>
  );
}