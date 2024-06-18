import styled from "styled-components";
import PrimaryBtn from "./PrimaryBtn";
import CartIcon from "./Icons/CartIcon";
import Link from "next/link";
const ProductWrapper = styled.div`
`;

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 100%;
        max-height: 80px;
    }

`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: 1rem;
    margin: 0;
    color: inherit;
    text-decoration: none;
`;

const ProductInfoBox = styled.div`
    margin-top: 5px;
    width: 20ch;
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
    const url = '/products/' + _id;
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
                    <PrimaryBtn primary={1} outline={1}>
                        Add to Cart
                    </PrimaryBtn>
                </PriceRow>
            </ProductInfoBox>
            
        </ProductWrapper>
        
    );
};