import styled, {css} from "styled-components";

export const ButtonStyle = css`
    border:0;
    color: #fff;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    svg{
        height: 16px;
        margin-right: 5px;
    }
    ${props => props.white && !props.outline && css`
        background-color: #fff;
        color: #000;
    `}
    ${props => props.white && props.outline && css`
        background-color: #222;
        color: #fff;
        border: 1px solid #fff;
    `}
    ${props => props.primary && css`
        background-color: #5542F6;
        color: #fff;
        border: 1px solid #5542F6;
    `}
    ${props => props.size === 'l' && css`
        font-size:1.2rem;
        padding: 10px 20px;
        svg{
            height: 20px;
        }
    `}
`;

const StyledBtn = styled.button`
    ${ButtonStyle}
`;

export default function PrimaryBtn({children, ...props}){
    return(
        <StyledBtn {...props}>
            {children}
        </StyledBtn>
    );
};