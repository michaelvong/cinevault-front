import styled from "styled-components";
import PrimaryBtn from "./PrimaryBtn";
import CartIcon from "./Icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
const ProductWrapper = styled.div`
    width: 25ch;
`;

const WhiteBox = styled(Link)`
    background-color: #D6D6D6;
    padding: 20px;
    height: 200px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{

        width: 160px;
        height: 200px;
    }

`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: 1.2rem;
    margin: 0;
    color: inherit;
    text-decoration: none;
`;

const ProductInfoBox = styled.div`
    margin-top: 5px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
`;

const Price = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`;

export default function ProductBux({_id, title, description, price, image}) {
    const url = '/product/' + _id;
    const {addProduct} = useContext(CartContext);
    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <img src={image[0]} alt />
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>
                    {title}
                </Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <PrimaryBtn onClick={() => addProduct(_id)} primary={1} outline={1}>
                        Add to Cart
                    </PrimaryBtn>
                </PriceRow>
            </ProductInfoBox>
            
        </ProductWrapper>
        
    );
};