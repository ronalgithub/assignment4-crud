"use client"
import Link from 'next/link'
import React from 'react'
import { ModalCerpen } from './ModalCerpen';
import Image from 'next/image';

const menuHead = [
    {label: "Beranda", href: "/"},
    {label: "Tentang Kami", href:"/about"},
    {label: "Kontribusi Cerpen", href: "/contribute"},
];

export const Header = () => {


    return (
  <>
 
    <div className="lg:navbar items-center justify-between bg-gradient-to-r from-primary to-white rounded-2xl max-w-7xl m-auto ">
        <div className="w-[200px] text-4xl font-extrabold bg-gradient-to-t from-error to-success bg-clip-text text-transparent text-center">Cerpen Anak.id</div>
        <div className="text-success"> 
        {menuHead.map ((item)=> {
            return (
                <Link href={item.href} key={item.label}>
                    <div className="classHeaderNav">{item.label}</div>
                </Link>
            )
        })}
        </div>
        <div className="gap-4 text-success">
            <div className="classHeaderNav border-primary rounded-3xl" onClick={() => document.getElementById("modalAddCerpen").showModal()}>Tambah Cerpen</div>
            <div className="classHeaderNav border-primary rounded-3xl"><Link href={"/joinus"}>Bergabung</Link></div>
        </div>
        <ModalCerpen />
    </div>
     </>
  )
}
