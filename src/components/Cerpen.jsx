"use client"
import Image from "next/image";
import { useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export const Cerpen = ({item}) => {
  const router = useRouter()
  const [editMode,setEditMode] = useState(false);
  //usestate untuk handle form editmode
  const [judul, setJudul] = useState(item.judul);
  const [deskripsi, setDeskripsi] = useState(item.deskripsi)
  const [pesanMoral, setPesanMoral] = useState(item.pesanmoral)
  const idCerpen = item._id;

  async function handleHapusCerpen () {
    const res = await fetch ("https://v1.appbackend.io/v1/rows/dl33noqe7qxW",{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([item._id])
    });
    
    const dataCerpen = await res.json()
    router.refresh() 
    toast.success("Cerpen berhasil Di Hapus")
  }

  async function handleUpdateCerpen () {
    const res = await fetch ("https://v1.appbackend.io/v1/rows/dl33noqe7qxW",{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"_id":item._id,judul,deskripsi,pesanmoral:pesanMoral,isdone:"false"})
    });
    
    const dataCerpen = await res.json()
    router.refresh() 
    toast.success("Cerpen berhasil Di Update")
    setEditMode(false)
  }


  //jika button edit di clik maka
  if (editMode) {
    return (   
      <main className="space-y-2 bg-secondary rounded-lg px-2">
        <h2>Edit Cerpen</h2>
          <input placeholder="Judul Cerpen" value={judul} onChange={(e)=> setJudul(e.target.value)}/>
          <textarea placeholder="Deskripsi Cerpen" value={deskripsi} onChange={(e)=> setDeskripsi(e.target.value)}></textarea>
          <textarea placeholder="Pesan Dalam Cerpen"  value={pesanMoral} onChange={(e) => setPesanMoral(e.target.value)}></textarea>
          <button className="classButton" onClick={handleUpdateCerpen}>Update Cerpen</button>
      </main>
    )
 
  }

  return (
    
            <div key={item._id} 
              className=" bg-primary rounded-xl ">
              <div className="flex gap-3 flex-col p-4 ">
                <h2>{item.judul} </h2> 
                <div><Image 
                  className="rounded-2xl hover:scale-105 transition duration-500  w-[400px] h-[250px] object-cover object-center " 
                  src={item.gambar} 
                  width={400} 
                  height={400} 
                  alt="Image Cerpen"
                  />
                </div>
                {/* <p>{item.deskripsi}</p> */}
                <p>Pesan Moral:</p>
                <p>&quot;{item.pesanmoral}&quot;</p>
                <div className="classButton"> <Link  href={`/cerpen/${idCerpen}`}>Selengkapnya</Link></div>
                <button className="classButton" onClick={handleHapusCerpen}>Hapus Cerpen</button>
                <button className="classButton" onClick={()=>setEditMode(true)}>Edit Cerpen</button>
                </div>    
            </div>
            
        
  )
}
