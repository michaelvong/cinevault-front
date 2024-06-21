import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import PrimaryBtn from "@/components/PrimaryBtn";
import CartIcon from "@/components/Icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ImageHolder = styled.div`
    img {

    }
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 40px;
    margin-top: 40px;
`;

const PriceRow = styled.div`
    display: flex;
    gap: 30px;
`;

const Price = styled.span`
    font-size: 1.4rem;
`;

export default function ProductPage({product}){
    const {addProduct} = useContext(CartContext);
    return (
        <>
            <Header/>            
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <img style = {{maxWidth:'100%'}} src={product.image} />
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>
                            {product.description}
                        </p>
                        <PriceRow>
                            <div><Price>${product.price}</Price></div>
                            <div>
                                <PrimaryBtn primary onClick={() => addProduct(product._id)}>
                                    <CartIcon/>Add to Cart
                                </PrimaryBtn>
                            </div>
                        </PriceRow>
                        
                    </div>
                    
                </ColWrapper>
                
            </Center>
        </>
    );
};

//https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props
export async function getServerSideProps(context){
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    console.log(context.query);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}