import React from "react";
import { Cerpen } from "./Cerpen";


export const CerpenList = ({dataCerpen}) => {

    return (
    <main className="card lg:grid lg:grid-cols-3 gap-2">
    {/* <main className="card m-4 w-80 shadow "> */}
      {dataCerpen.map((item, index)=> {
          return (
            <Cerpen item={item} key={index} />
          )      
          })}
    </main>
  );
};


