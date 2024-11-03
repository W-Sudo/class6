import {useEffect,useState} from "react";


export default function App() {
  const [searchTerm,setSearchTerm]=useState("");
  const [category,setCategory]= useState("All");
  const [products,setProducts]=useState([]);
  useEffect(() => {
    (async()=>{
      const response=await fetch("products.json");
      const data=await response.json();
      setProducts(data);
    })();
  },[]);
  function handleSubmit(event){
    event.preventDefault();
    const newCategory=event.target.elements.category.value;
    setCategory(newCategory);
    const newSearchTerm=event.target.elements.searchTerm.value;
    setSearchTerm(newSearchTerm);
  }
    return (
      <>
        <header>
          <h1>The Can Store</h1>
        </header>
        <div>
          <aside>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="category">Choose a category:</label>
                <select name="category">
                  <option>All</option>
                  <option>Vegetables</option>
                  <option>Meat</option>
                  <option>Soup</option>
                </select>
              </div>
              <div>
                <label htmlFor="searchTerm">Enter search term:</label>
                <input type="text" name="searchTerm" placeholder="e.g. beans" />
              </div>
              <div>
                <button onSubmit={handleSubmit}>Filter results</button>
              </div>
            </form>
          </aside>
          <main>
            {products.map((product)=>{
              return (
              ((category=="All"||product.type==category.toLowerCase())&&(product.name.includes(searchTerm.toLowerCase()))&&<section class={product.type}>
                <h2>{product.name.charAt(0).toUpperCase()+product.name.slice(1)}</h2>
                <p>${product.price}</p>
                <img src={`/images/${product.image}`} alt={product.name}/>
              </section>))}
            )}
            </main>
        </div>
        <footer>
          <p>All icons found at the Noun Project:</p>
          <ul>
            <li>
              Bean can icon by{" "}
              <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
            </li>
            <li>
              Vegetable icon by{" "}
              <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
            </li>
            <li>
              Soup icon by{" "}
              <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
            </li>
            <li>
              Meat Chunk icon by{" "}
              <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
            </li>
          </ul>
        </footer>
      </>
    );
  }