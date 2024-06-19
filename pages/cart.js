import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import PrimaryBtn from "@/components/PrimaryBtn";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    margin-top: 40px;
    
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    
`;

const ProductInfoCell = styled.td`
    padding: 10px;
    
`;

const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 1px solid rgba(0,0,0,.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 80px;
        max-height: 80px;
    }
`;

const TruncatedTitle = styled.div`
    width: 15ch;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
const QuantityLabel = styled.span`
    padding: 0 3px;
`

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

export default function Cart(){
    const {cartProducts, addProduct, removeProduct} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if(cartProducts.length > 0){
            axios.post('/api/cart', {ids: cartProducts}).then(res => {
                setProducts(res.data);
            })
        }
    }, [cartProducts]);

    function incrementProd(id){
        addProduct(id);
    };

    function decrementProd(id){
        removeProduct(id);
    };

    async function goPayment(){
        const res = await axios.post('/api/checkout', {
            name,email,city,country,postalCode,address,
            cartProducts,
        });
        if(res.data.url){
            window.location = res.data.url;
        }
    }
    let total = 0;
    for (const prodId of cartProducts){
        const price = products.find(p => p._id === prodId)?.price || 0;
        total += price;
    }

    if(typeof window !== "undefined" && window.location.href.includes('success')){
        return (
            <>
                <Header/>
                <Center>
                    <Box>
                        <h1>Thanks for your order!</h1>
                        <p>Details will be emailed</p>
                    </Box>
                </Center>
            </>
        )
    };

    return(
        <>
            <Header/>
            <Center>
               <ColumnsWrapper>
                    <Box>
                        <h2>
                            Cart
                        </h2>
                        {!cartProducts?.length && (
                            <div>
                                Cart is empty
                            </div>
                        )}
                        {cartProducts?.length > 0 &&(
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((prod, index) => (
                                        <tr key={index}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src = {prod.image[0]} alt="" />
                                                </ProductImageBox>
                                                <TruncatedTitle>
                                                    {prod.title} 
                                                </TruncatedTitle>
                                            </ProductInfoCell>
                                            <td>
                                                
                                                <PrimaryBtn onClick = {() => decrementProd(prod._id)} cart>-</PrimaryBtn>
                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === prod._id).length}
                                                </QuantityLabel>
                                                <PrimaryBtn onClick = {() => incrementProd(prod._id)}cart>+</PrimaryBtn>
                                            </td>
                                            <td>
                                                ${cartProducts.filter(id => id === prod._id).length*prod.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            ${total}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!cartProducts?.length && (
                       <Box>
                            <h2>
                                Order Information
                            </h2>
                            
                                <Input type="text" placeholder="Name" value={name} name="name" onChange={ev => setName(ev.target.value)}/>
                                <Input type="text" placeholder="Email" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/>
                                <Input type="text" placeholder="Street Address" value={address} name="address" onChange={ev => setAddress(ev.target.value)}/>
                                <CityHolder>
                                    <Input type="text" placeholder="City" value={city} name="city" onChange={ev => setCity(ev.target.value)}/>
                                    <Input type="text" placeholder="Postal Code" value={postalCode} name="postalCode" onChange={ev => setPostalCode(ev.target.value)}/>
                                </CityHolder>                 
                                <Input type="text" placeholder="Country" value={country} name="country" onChange={ev => setCountry(ev.target.value)}/>
                                <PrimaryBtn onClick={goPayment} black primary block>
                                    Continue to pay
                                </PrimaryBtn>
                        </Box> 
                    )}
                    
                </ColumnsWrapper> 
            </Center>
                   
        </>
    );
};