import Layout from "@/components/Layout";
import Delete from "@/components/svg-components/Delete";
import Edit from "@/components/svg-components/Edit";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Products(){
  const [products,setProducts] = useState([]);
  useEffect(()=>{
    axios.get('/api/products')
    .then(response=>{
      setProducts(response.data);
    })
    .catch(e=>{
      console.log(e);
    })
  },[])
  return (
    <Layout>
      <Link className="bg-blue-900 text-white rounded-md  py-1 px-2" href={'/products/new'}>Add new products</Link>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Product Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product)=>(
            <tr>
              <td>{product.title}</td>
              <td>
                <Link href={`/products/edit/${product._id}`}>
                  <Edit/>
                  Edit
                </Link>
                <Link href={`/products/delete/${product._id}`}>
                  <Delete/>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}