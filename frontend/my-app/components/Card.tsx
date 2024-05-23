type Props = {
    text?: string,
    x: number
}
const Card = ({text,  x}:Props)=>{
    return(
        <div>
            <p>{text}{x}</p>
        </div>
    )
}

export default Card