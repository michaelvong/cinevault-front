import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewMovies from "@/components/NewMovies";
import { mongooseConnect } from "@/lib/mongoose";
import {Product} from "@/models/Product";

export default function Home({product}){
  return (
    <div>
      <Header />
      <Featured product = {product}/>
      <NewMovies></NewMovies>
    </div>
    
  );
};

export async function getServerSideProps(){
  const featuredProductId = '666b7a4c0a2c8e3f794864dd';
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);
  return {
    props: {product: JSON.parse(JSON.stringify(product))},
  };
}