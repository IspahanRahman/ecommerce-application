import React,{ useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Upload from './svg-components/Upload';

const ProductsForm = ({
  _id,
  title:existingTitle,
  description:existingDescription,
  price:existingPrice,
  images
}) => {
  const [title,setTitle] = useState(existingTitle || '');
  const [description,setDescription] = useState(existingDescription || '');
  const [price,setPrice] =useState(existingPrice || '');
  const [goToProducts,setGoToProducts] = useState(false);
  const router = useRouter();
  const saveProduct = async(e) => {
    e.preventDefault();
    const data = {title,description,price};
    if(_id){
      await axios.put('/api/products',{...data,_id});
    }
    else{
      await axios.post('/api/products',data);
    }
    setGoToProducts(true);
  }
  if(goToProducts){
     router.push('/products');
  }
  
  const uploadImages = async(event) =>{
    const files = event.target.files;
    if(files.length>0){
      const data = new FormData();
      files.array.forEach(file => {
        data.append('file',file);
      });

      const res = await axios.post('/api/upload',data);
      console.log(res.data);

    }
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input 
        type="text" 
        placeholder="product name" 
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
      <label>
        Photos
      </label>
      <div className=' mb-2'>
        <label className='w-24 h-24 cursor-pointer text-center flex flex-col justify-center items-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200'>
          <Upload/>
          Upload
          <input type='file' onChange={uploadImages} className='hidden'/>
        </label>
        {!images?.length &&(
          <div>
            No Photos in this Product
          </div>
        )}
      </div>
      <label>Description</label>
      <textarea 
        placeholder="description" 
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        ></textarea>
      <label>Price (in USD)</label>
      <input 
        type="number" 
        placeholder="price" 
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
        />
      <button type="submit" className="btn-primary">Save</button>
    </form>

  )
}

export default ProductsForm