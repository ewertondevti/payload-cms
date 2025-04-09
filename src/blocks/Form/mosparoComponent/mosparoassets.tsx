import React from 'react';
import { Helmet } from 'react-helmet';

const MosparoAssets = () => {
 return (
  <Helmet>
   {/* Link do CSS do Mosparo */}
   <link
    rel="stylesheet"
    href="https://mosparo.irn.internal/resources/f88fbf2f-d7e5-4c66-9811-6029a091be99.css"
   />
   {/* Script do front-end do Mosparo */}
   <script src="https://mosparo.irn.internal/build/mosparo-frontend.js" type="text/javascript" />
  </Helmet>
 );
};

export default MosparoAssets;
