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
              className=" rounded-3xl m-4 w-100 bg-primary shadow-2xl shadow-secondary">
              {/* <div className="flex gap-3 flex-col p-4 "> */}
                <figure><Image 
                   className="hover:scale-105 transition duration-500  w-[400px] h-[250px] object-cover " 
                  src={item.gambar} 
                  width={400} 
                  height={400} 
                  alt="Image Cerpen"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title justify-center">{item.judul} </h2> 
                  <p>Pesan Moral:</p>
                  <p>&quot;{item.pesanmoral}&quot;</p>
                  <div className="classButton"> <Link  href={`/cerpen/${idCerpen}`}>Selengkapnya</Link></div>
                  <button className="classButton" onClick={handleHapusCerpen}>Hapus Cerpen</button>
                  <button className="classButton" onClick={()=>setEditMode(true)}>Edit Cerpen</button>
                  </div> 
                {/* </div>    */}
            </div>
            
        
  )
}
