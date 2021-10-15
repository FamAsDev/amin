import {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import axios from "axios";

const CategoriesApi = () => {

    const [categories, setCategories] = useState([]);
    const [callback, setCallback] = useState(false);

    useEffect(() => {
       const getCategories = async () => {
            try {
                const res = await axios.get("/api/category");

                setCategories(res.data)
            } catch (err) {
                toast.error(err.response.data.msg);
            }
        }

        getCategories();
    },[callback]);

    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesApi
