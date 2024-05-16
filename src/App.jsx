import "./App.css";
import AVLTreeCanvas from "./components/RenderTree";

function App() {
  const treeData = {
    name: "50",
    children: [
      {
        name: "25",
        children: [
          { name: "10" },
          { name: "30", children: [{ name: "27" }, { name: "35" }] },
        ],
      },
      {
        name: "75",
        children: [
          { name: "60", children: [{ name: "55" }, { name: "65" }] },
          { name: "80", children: [{ name: "77" }, { name: "85" }] },
        ],
      },
    ],
  };

  return (
    <div>
      <h1>Simulador de Árvore binária</h1>
      <div>
        <input type="text" id="valor" placeholder="Digite um valor" />
      </div>

      <div className="container-arvore">
        <AVLTreeCanvas treeData={treeData} />
      </div>
    </div>
  );
}

export default App;
