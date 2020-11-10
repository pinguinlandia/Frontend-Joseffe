const SHOP_DATA = [ 
  {
    id: 1,
    title: "Produtos",
    routeName: "",
    items: []
  }
]

const request = async () => {
  const dados = await fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos`);
  const json = await dados.json();
  return json;
}
  

(async function(){
  await request().then(result=> SHOP_DATA[0].items=result)
})()

export default SHOP_DATA;

