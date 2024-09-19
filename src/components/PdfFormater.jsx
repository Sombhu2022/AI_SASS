import React from 'react';
import { Text } from '@react-pdf/renderer';
import ReactMarkdown from 'react-markdown';

const PdfFormater = ({ markdownText }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{children}</Text>,
        h2: ({ children }) => <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{children}</Text>,
        p: ({ children }) => <Text style={{ marginBottom: 10 }}>{children}</Text>,
      }}
    >
      {markdownText}
    </ReactMarkdown>
  );
};

export default PdfFormater;
