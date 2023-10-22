import { useEffect, useState } from "../lib"

const admin = () =>{
    const [books, setdata] = useState([])
    const fetchBook = ()=>{
        fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(data => setdata(data))
    }

    useEffect(function(){
        fetchBook()
    },[])

    useEffect(function(){
        const btndel = document.querySelectorAll('.btn-del')
        console.log(btndel);
        btndel.forEach(function(btn){
            btn.addEventListener('click',function(){
                const id = btn.dataset.id
                if(id){
                    const rule = confirm('sure?')
                    if(rule){
                        fetch('http://localhost:3000/products/' + id,{
                            method: "DELETE"
                        }).then(()=>{
                            alert('complete')
                            fetchBook()
                        })
                    }
                }
            })
        })
    })
    return/*html*/`
    <div class="text-center my-[30px]">
    <a class="p-1 bg-blue-500 rounded-[5px]" href="/admin/add">ADDBOOK</a>
  
    </div>
<div class="relative overflow-x-auto flex justify-center sm:rounded-lg">
<table class="w-[100%] text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="px-6 py-3">
               Name
            </th>
            <th scope="col" class="px-6 py-3">
               Place
            </th>
            <th scope="col" class="px-6 py-3">
               description
            </th>
            <th scope="col" class="px-6 py-3">
                Price
            </th>
            <th scope="col" class="px-6 py-3">
                rate
            </th>
            <th scope="col" class="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    <tbody>
        ${books.map(function(book){
            return`<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900  dark:text-white">
                ${book.name}
            </th>
            <th class="px-6 py-4">
                ${book.place}
            </th>
            <th class="max-w-[10px] px-6 py-4">
                ${book.description}
            </th>
            <th class="px-6 py-4">
                ${book.price}
            </th>
            <th class="px-6 py-4">
                ${book.rate}
            </th>
            <td class="px-6 py-4">
                <button data-id="${book.id}" class="btn-del p-1 text-white bg-red-500 rounded-[5px]">Delete</button>
                <a href="/admin/edit/${book.id}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        </tr>`
        })}
    </tbody>
</table>
</div>

    
    `
}

export default admin