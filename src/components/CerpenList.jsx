import React from "react";
import { Cerpen } from "./Cerpen";


export const CerpenList = ({dataCerpen}) => {

    return (
    <main className="card grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataCerpen.map((item, index)=> {
          return (
            <Cerpen item={item} />
          )      
          })}
    </main>
  );
};


