import { useRef, useEffect } from "react";

function AVLTreeCanvas({ treeData }) {
  const canvasRef = useRef(null);
  const nodeRadius = 25;
  const nodeColor = "#ADD8E6";
  const lineColor = "#CCC";
  const arrowColor = "#999";
  const textColor = "#333";
  const textFont = "15px Monospace";
  const arrowSize = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Limpar o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar a árvore AVL
    if (treeData) {
      drawTree(context, treeData, canvas.width / 2, 50, canvas.width / 4, 60);
    }
  }, [treeData]);

  // Função para desenhar linha com seta
  const drawArrowLine = (context, startX, startY, endX, endY) => {
    // Desenha a linha
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = lineColor;
    context.stroke();

    // Calcula o ângulo da linha
    const angle = Math.atan2(endY - startY, endX - startX);

    // Desenha a seta
    context.fillStyle = arrowColor;
    context.beginPath();
    context.moveTo(endX, endY);
    context.lineTo(
      endX - arrowSize * Math.cos(angle - Math.PI / 6),
      endY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    context.lineTo(
      endX - arrowSize * Math.cos(angle + Math.PI / 6),
      endY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    context.closePath();
    context.fill();
  };

  const drawTree = (context, node, x, y, dx, dy) => {
    if (!node) return;
    // Desenhar nó da árvore
    context.beginPath();
    context.arc(x, y, nodeRadius, 0, 2 * Math.PI);
    context.fillStyle = nodeColor;
    context.fill();
    context.strokeStyle = textColor;
    context.stroke();

    // Desenhar texto do nó
    context.fillStyle = textColor;
    context.font = textFont;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(node.name, x, y);

    if (node.children) {
      const numChildren = node.children.length;
      const startX = x - ((numChildren - 1) * dx) / 2;

      for (let i = 0; i < numChildren; i++) {
        const childX = startX + i * dx;
        const childY = dy + 70;

        // Desenha a linha com seta
        drawArrowLine(context, x, y + nodeRadius, childX, childY);

        // Chama a função recursivamente para desenhar o filho
        drawTree(context, node.children[i], childX, childY, dx / 2, dy + 70);
      }
    }
  };

  return <canvas ref={canvasRef} width={1300} height={800} />;
}

export default AVLTreeCanvas;
