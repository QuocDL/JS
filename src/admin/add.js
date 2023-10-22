import { useEffect, useState } from "../lib"
import * as Joi from 'joi'
const addbookschema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty":"Chưa nhập dữ liệu"
    }),
    price: Joi.number().required().messages(),
    place: Joi.string().required().messages(),
    description: Joi.string().required().messages(),
    rate: Joi.string().required().messages(),
})

const addBook = () => {
    const [error, setError] = useState(null)
    const PostBook =(data)=>{
        fetch('http://localhost:3000/products',{
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(()=>{
            alert('complete')
            window.location.href = '/admin'
        })
    }

   useEffect(function(){
    const createForm = document.getElementById('create-form')
    createForm.onsubmit = function(event){
        event.preventDefault()
        const formdata = new FormData(createForm)
        const name = formdata.get('name')
        const place = formdata.get('place')
        const price = formdata.get('price')
        const description = formdata.get('description')
        const rate = formdata.get('rate')
        const addnewBook = {
            name, place, price, description, rate
        }
        const {error} = addbookschema.validate(addnewBook)
        if(error){
            setError(error)
        }else{
            PostBook(addnewBook)
        }
    }
   }, [error])
    return`
<div class="  bg-gray-500 my-[50px] rounded-[20px] mx-auto w-[40%] px-[12px] py-[40px] sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center">
    <h1 class="text-2xl font-bold sm:text-3xl">Get started today!</h1>

    <p class="mt-4 text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
        eaque error neque ipsa culpa autem, at itaque nostrum!
    </p>
    </div>
    <form id="create-form" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div>
        <label>Tên</label>

        <div class="relative">
        <input
            type="text"
            name="name"
            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Nhận tên sản phẩm"
        />
        </div>
    </div>
    <div>
        <label>Tên NSX</label>

        <div class="relative">
        <input
            type="text"
            name="place"
            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Nhận tên NSX"
        />
        </div>
    </div>

    <div>
        <label>Giá</label>

        <div class="relative">
        <input
            type="number"
            name="price"
            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Nhập giá sản phẩm"
        />
        </div>
    </div>

    <div>
        <label>Mô tả</label>

        <div class="relative">
        <textarea 
            rows="number"
            name="description"
            class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Nhập mô tả sản phẩm"
        ></textarea>
        </div>
    </div>
    <div>
        <label>Đánh giá</label>

        <div class="mt-[15px]">
        <select class="rounded-[8px]" name="rate" id="">
            <option value="1">1 Sao</option>
            <option value="2">2 Sao</option>
            <option value="3">3 Sao</option>
            <option value="4">4 Sao</option>
            <option value="5">5 Sao</option>
        </select>
        </div>
    </div>

    <div class="flex items-center justify-between">
        <div class="text-red-500">${error || ""}</div>
        <button
        type="submit"
        class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
        Thêm mới
        </button>
    </div>
    </form>
</div>
    `
}
export default addBook