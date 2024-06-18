import styled from "styled-components";
import Center from "@/components/Center";
import PrimaryBtn from "./PrimaryBtn";
import ButtonLink from "./ButtonLink";
import CartIcon from "./Icons/CartIcon";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;

const Title = styled.h1`
    margin:0;
    font-weight: normal;
    font-size: 2.5rem;
`;

const Desc = styled.p`
    color: #aaa;
    font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: .9fr 1.1fr;
    gap: 40px;

    img{
        max-width: 100%;
    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
`;

const Column = styled.div`
    display:flex;
    align-items: center;
`;

export default function Featured({product}){
    return(
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>
                                {product.title}
                            </Title>
                            <Desc>
                                {product.description}
                            </Desc>
                            <ButtonsWrapper>
                                <ButtonLink href={'/products/'+product._id} outline={1} white={1}>
                                    Read More
                                </ButtonLink>
                                <PrimaryBtn primary>
                                    <CartIcon/>
                                    Add to Cart
                                </PrimaryBtn>
                            </ButtonsWrapper>
                        </div>   
                    </Column>
                    <Column>

                    </Column>
                </ColumnsWrapper>            
            </Center>       
        </Bg>
    );
};