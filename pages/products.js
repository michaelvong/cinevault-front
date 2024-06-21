import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const Title = styled.h1`
    font-size: 1.5em;
`;

export default function ProductsPage({products}){
    return (
        <>
            <Header />
            <Center>
                <Title>All Products</Title>
                <ProductsGrid products={products} />
            </Center>
            
        </>
    );
};

//getServerSideProps is a nextjs function
//this function runs everytime page is rendered
//https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
export async function getServerSideProps() {
    await mongooseConnect();
    const movies = await Product.find({}, null, {sort: {'_id':-1}})
    return {
        props:{
            products: JSON.parse(JSON.stringify(movies)),
        }};
}