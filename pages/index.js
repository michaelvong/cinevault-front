import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewMovies from "@/components/NewMovies";
import { mongooseConnect } from "@/lib/mongoose";
import {Product} from "@/models/Product";

export default function Home({featuredProduct, newProducts}){
  return (
    <div>
      <Header />
      <Featured product = {featuredProduct}/>
      <NewMovies products = {newProducts}></NewMovies>
    </div>
    
  );
};

export async function getServerSideProps(){
  const featuredProductId = '667503628a0b9c97add34f75';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 5})
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}