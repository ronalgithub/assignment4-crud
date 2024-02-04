

import Image from 'next/image';
import Link from 'next/link';

async function getDataCerpenDetail (cerpenid) {
  const cerpenId = String(cerpenid);
  const url = `https://v1.appbackend.io/v1/rows/dl33noqe7qxW/${cerpenId}`;
  // console.log(url)
  const res = await fetch (url);
  const cerpenDetail = await res.json();

   return cerpenDetail;
}

export  default async function Page({params}) {
  const {cerpenid} = params;
  const dataDetail  = await getDataCerpenDetail(cerpenid);
   
  return (
            <main>
            <div key={dataDetail._id} 
              className="space-y-2 rounded-xl px-3 bg-secondary my-10 max-w-7xl m-auto ">
              <div className="flex gap-3 flex-col px-2 py-2 ">
                <h2>{dataDetail.judul} </h2> 
                <div className=" lg:flex gap-5">
                <Image 
                  className="rounded-2xl object-cover" 
                  src={dataDetail.gambar} 
                  width={480} 
                  height={100} 
                  alt="Image Cerpen"
                  />
                <p className=" text-justify">{dataDetail.deskripsi}</p>
                </div>
                <p>Pesan Moral:</p>
                <p>&quot;{dataDetail.pesanmoral}&quot;</p>
                <div className="classButton"> <Link  href={"/"}>Kembali</Link></div>
              </div>    
            </div>
            </main>
  )
}

