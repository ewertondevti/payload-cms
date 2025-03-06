import React from 'react';

interface FormTitleProps {
 title?: string;
 subtitle?: string;
}
const FormTitle: React.FC<FormTitleProps> = ({ title, subtitle }) => {
 return (
  <div className="mb-6 block">
   <h1 className="text-3xl font-bold text-[#021C51]">{title}</h1>
   {subtitle && <p className="text-base text-gray-600 mt-2">{subtitle}</p>}
  </div>
 );
};

export default FormTitle;
