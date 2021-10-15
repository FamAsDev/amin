import React from 'react'
import { Link } from 'react-router-dom'

const BannerDeleteBtn = ({item, deleteBanner}) => {
    return (
       <div className="d-grid gap-2 mx-5 my-2 position-absolute top-50 mt-5">
            <button className="btn btn-danger rounded-circle py-2"  data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Delete The Banner">
                <Link to="/delete" className=" text-white" onClick={() => deleteBanner(item._id  , item.banner.public_id)}>
                    <span class="material-icons">
                        delete
                    </span>
                </Link>
            </button>
       </div>
    )
}

export default BannerDeleteBtn
