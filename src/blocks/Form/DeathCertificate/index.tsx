import React from 'react';

import { useForm } from 'react-hook-form';
import FormTitle from '../formTitle';

type DeathCertificateProps = {
 title: string;
 subtitle?: string;
};
const DeathCertificate: React.FC<DeathCertificateProps> = ({
 title,
 subtitle,
}) => {
 const { register, formState: { errors } } = useForm();

 return (
  <div>
   <FormTitle title={title} subtitle={subtitle} />

   {/* <AddressData name="address" register={register} errors={errors} /> */}


  </div>
 );
};

export default DeathCertificate;
