import  {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import axios from "axios"

const UserApi = (token) => {

    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [history, setHistory] = useState([])
    const [ cart, setCart ] = useState([])

    useEffect(() => {
      if(token){
          const getUser = async () => {
              try {
                 const res = await axios.get("/user/infor", {
                     headers: { Authorization : token }
                 });

                 setIsLogged(true)

                 res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                 setCart(res.data.cart)
                 setUser(res.data)

              } catch (err) {
                    toast.error(err.response.data.msg);
              }
          }

          getUser();
        
      }
    }, [token])

    
    const addCart = async (product) => {
        if(!isLogged) return toast.error("Please login to continue buying.");
        const check = cart.every(item => {
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, { ...product, quantity: 1 }])

            await axios.patch("/user/addcart", { cart: [...cart, { ...product, quantity: 1 }]},{
                headers: {Authorization: token}
            })
        }else{
            toast.warn("this product is already in the cart..");
        }
    }

    return {
        User: [user, setUser],
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [ cart, setCart ],
        history:[history, setHistory],
        addCart: addCart,
    }
}

export default UserApi
