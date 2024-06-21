import styled from "styled-components";
import ProductBox from "./ProductBox";

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;
`

export default function ProductsGrid({products}){
    return (
        <Grid>
            {products?.length > 0 && products.map((prod, index) => (
                <ProductBox {...prod} key={index}/>
            ))}
        </Grid>
    );
};