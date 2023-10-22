import addBook from "./admin/add";
import admin from "./admin/admin";
import edit from "./admin/edit";
import { render, router } from "./lib";
import './style.css'


// Router
router.on('/', function () {
  render("#app", () => `
  <div class="text-center my-[30px]">
  <a class="p-1 bg-blue-500 rounded-[5px]" href="/admin">admin</a>

  </div>
  `)
})
router.on('/admin',function(){
  render('#app', admin)
})
router.on('/admin/add', function(){
  render('#app', addBook)
})
router.on('/admin/edit/:id', function({data}){
  render("#app", () => edit(data.id))
})

router.resolve();

