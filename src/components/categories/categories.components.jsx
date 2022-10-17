import DirectoryItem from "../directory-item/directory-item.component";
import "./categories.styles.scss";

const CategoriesContainier = (props) => {
    const {categories} = props
    return(
        <div className="categories-container">
        {categories.map(({title, id, imageUrl}) => (
          <DirectoryItem title={title} key={id} imageUrl={imageUrl}/>
        ))}
     </div>
    )
} 

export default CategoriesContainier;