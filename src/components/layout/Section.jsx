import { ethers } from 'ethers'
// import './index.css';
// import "./Product.css"
// Components
import Rating from './Rating'

const Section = ({ title, items, togglePop }) => {
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>

            <hr />

            <div className='cards'>
                {items.map((item, index) => (

                    <div className='card' key={index} onClick={() => togglePop(item)}>

                        <div className='card__image'>

                            <img src={`http://localhost:8081/product/a.png`} alt="Item" />
                        </div>
                        <div className='card__info'>
                            <h4>{item.name}</h4>
                            <Rating value={item.rating} />
                            <p>{ethers.utils.formatUnits(item.price.toString(), 'ether')} ETH</p>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default Section;