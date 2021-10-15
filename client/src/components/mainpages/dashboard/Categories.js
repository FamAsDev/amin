import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLinks from './DashboardLinks';
import Loading from '../utils/loading/Loading';

const Categories = () => {

    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    // Token
    const [token] = state.token;
    // Category api
    const [categories] = state.categoriesApi.categories;
    // Callback
    const [callback, setCallback] = state.categoriesApi.callback;
    // Category state
    const [category, setCategory] = useState("");
    // id
    const [id, setID] = useState(false);
    // Edit
    const [onEdit, setOnEdit] = useState(false);

   // Create a category
   const createCategory = async (e) => {
    e.preventDefault();
        try {

            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })

                toast.success(res.data.msg);
            }else{
                const res = await axios.post("/api/category", {name: category}, {
                    headers: {Authorization: token}
                })

                toast.success(res.data.msg);
            }
            setOnEdit(false)
            setCategory("")
            setCallback(!callback);

        } catch (err) {
            toast.error(err.response.data.msg);
        }
    }

     // Edit a Category
     const editCategory = async (id, name) => {
        setID(id);
        setCategory(name);
        setOnEdit(true)
    }

    // Delete a Category
    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/api/category/${id}`,{
                headers: {Authorization: token}
            })

            toast.success(res.data.msg);
            setCallback(!callback);
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    }

    return (
        <>
        {/* // <!--_______________ Categories _______________--> */}
        <section className="profile">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <DashboardLinks/>
                    </div>

                    <div className="col-md-9">
                        <div className={`card ${ night && 'bgNightCard nightColor'}`}>
                            <div className="card-body">
                                <div id="profile">
                                    <div className="profile_setting">
                                        <form action="" onSubmit={createCategory}>
                                            <div className="row">
                                                <h4 className="my-3 w-100 pl-3">Categories</h4>
                                                <div className="col-md-12 ">
                                                    <div className="input-group input-group-lg mb-5 ">
                                                        <input 
                                                            type="text" 
                                                            className={`form-control ${ night && 'bgNightBody nightColor' }`}
                                                            placeholder="Create a category"
                                                            name="category" 
                                                            onChange={ e => setCategory(e.target.value)} 
                                                            value={category} required
                                                        />
                                                        <button type="submit" className={`input-group-text bg-success text-white ${  night && 'bgNightCard' }`} id="inputGroup-sizing-lg">{ onEdit ? 'Update' : "Create" }</button>
                                                    </div>
                                                </div>
                                               
                                                <div className="col-md-12">
                                                    <label htmlFor="myCheck_3" className="profile_label">
                                                        <div className={`address_card ${ night && ' bgNightCard nightBorder shadow-lg' }`}>
                                                            {
                                                                categories.map(category => (
                                                                    <div className="input-group mb-4" key={category._id}>
                                                                        <input type="text" value={category.name}  className={`form-control border-0 ${ night && 'bgNightBody nightColor' }`} disabled style={{height: '50px'}}/>
                                                                        <button className="btn btn-primary" onClick={() => editCategory(category._id, category.name)} type="button">Edit</button>
                                                                        <button className="btn btn-danger" onClick={() => deleteCategory(category._id)} type="button">Delete</button>
                                                                    </div>
                                                                ))
                                                            }
                                                            {!categories.length && <Loading height={50} width={396} />}
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
         </>                                       
    )
}

export default Categories
