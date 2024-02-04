import { Header } from "@/components/Header";
import { AddCerpen } from "../components/AddCerpen";
import { CerpenList } from "../components/CerpenList";
import { Footer } from "@/components/Footer";



async function getDataCerpen () {
  const res = await fetch ("https://v1.appbackend.io/v1/rows/dl33noqe7qxW", {
    cache: "no-cache",
  });
  const dataCerpen = await res.json();
  return dataCerpen;
}
export default async function Home() {
  const { data } = await getDataCerpen();

  return (
     <>
        <Header />
        <main className=" mt-10 max-w-7xl m-auto">
        <CerpenList dataCerpen={data}/>
        </main> 
        <Footer />
    </>
  );
}
