"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const AddCerpen = () => {

    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("")
    const [pesanMoral, setPesanMoral] = useState("")
    const  [loading, setLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState("");
//untuk melakukan refresh / refetching page
    const router = useRouter()

    async function handleUploadGambar (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'cldfydrp');
  
      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dgt0nrylf/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (cloudinaryResponse.ok) {
        return await cloudinaryResponse.json();
      } else {
        throw new Error('Gagal mengunggah gambar ke Cloudinary');
      }
    }

    async function handleTambahCerpen () {
      //ketika pertama kali di klik button tambah cerpen 
      setLoading (true);

      const cloudinaryResponse = await handleUploadGambar(thumbnail);
      if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
        console.error('Gagal mengunggah gambar ke Cloudinary');
        return;
      }
  
      // Dapatkan URL gambar dari respons Cloudinary
      const imageUrl = cloudinaryResponse.secure_url;

      const res = await fetch ("https://v1.appbackend.io/v1/rows/dl33noqe7qxW",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{judul,deskripsi,pesanmoral:pesanMoral,isdone:"false",gambar: imageUrl}])
      });
      
      const dataCerpen = await res.json()
      //untuk melakukan cek respon dari endpoint api
      //  console.log(dataCerpen);
      setJudul("");
      setDeskripsi("");
      setPesanMoral("");
      router.refresh()
      //setelah sudah selesai setloading false
      setLoading(false);
      toast.success("Data Cerpen Berhasil Di Tambahkan");

      

      
    }

  return (
    <main className="max-w-[500px] bg-secondary rounded-xl m-auto my-10 py-2 px-2 space-y-3 ">
        <h2>Tambah Cerita Pendek</h2>
        <input placeholder="Judul Cerpen" value={judul} onChange={(e)=> setJudul(e.target.value)}/>
        <textarea placeholder="Deskripsi Cerpen" value={deskripsi} onChange={(e)=> setDeskripsi(e.target.value)}></textarea>
        <textarea placeholder="Pesan Dalam Cerpen" value={pesanMoral} onChange={(e) => setPesanMoral(e.target.value)}></textarea>
        <input type="file" accept="image/*"  onChange={(e) => setThumbnail(e.target.files[0])} />
        <button disabled={loading} className="classButton" onClick={handleTambahCerpen}>Tambah Cerpen</button>
    </main>
  )
}
