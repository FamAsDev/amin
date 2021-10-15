import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading';

const Filters = () => {
    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    // categories APi
    const [categories] = state.categoriesApi.categories;
    // Category
    const [category, setCategory] = state.productsAPI.category;
    // Search
    const [search, setSearch] = state.productsAPI.search;

    // Get category and set
    const handleCategory = (e) => {
        setCategory(e.target.value);
        setSearch("");
    }

    return (
        <ul id="accordion" className="accordion">
            <ul className={`category_menu ${ night && 'nightColor'}`}>
                {
                    !categories.length ?
                    [0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => <Loading key={i} height={20} width={180} mb={40} mb={18}/>)
                    :
                    <>
                        <li>
                            <option  data-bs-dismiss="modal" aria-label="close" className="link" onClick={() => setCategory('')}>All Products</option>
                            <i className="fa fa-chevron-right icon"></i>
                        </li>
                        
                    {
                        categories.map(category => (
                            <li key={category._id}>
                                <option  data-bs-dismiss="modal" aria-label="close" onClick={handleCategory}  value={"category=" + category._id}  className="link" >
                                    {category.name}
                                </option>
                                <i className="fa fa-chevron-right icon"></i>
                            </li>
                        ))
                    }
                    </>
                }
            </ul>
        </ul>
    )
}

export default Filters
