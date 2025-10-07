import { useState, useEffect } from "react";
import { styles } from "../../App";

export function Play() {
  const boardTheme = ["#adadadff", "#222222ff"];
  const [currentBoard, setCurrentBoard] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
  );

  useEffect(() => {
    setCurrentBoard("8/8/8/4p1K1/2k1P3/8/8/8");
  }, []);

  return (
    <div style={{ justifyItems: "center" }}>
      <div style={styles.container}>
        <h1>Chess Board</h1>
        {currentBoard.split("/").map((row, i) => (
          <div
            key={i}
            style={{
              width: "80vmin",
              height: "10vmin",
              display: "flex",
            }}
          >
            {expandFENRow(row, i)}
          </div>
        ))}
      </div>
    </div>
  );

  function expandFENRow(row: string, rowIndex: number) {
    const elements: React.ReactElement[] = [];
    let col = 0;

    for (const char of row) {
      const isNumber = !isNaN(parseInt(char));
      if (isNumber) {
        const count = parseInt(char);
        for (let i = 0; i < count; i++) {
          elements.push(renderSquare(null, col++, rowIndex));
        }
      } else {
        elements.push(renderSquare(char, col++, rowIndex));
      }
    }
    return elements;
  }

  function renderSquare(piece: string | null, col: number, row: number) {
    const color = (row + col) % 2 === 0 ? boardTheme[0] : boardTheme[1];
    return (
      <div
        key={row * 8 + col}
        style={{
          width: "10vmin",
          height: "10vmin",
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "6vmin",
        }}
      >
        {piece && (
          <img
            src={`/public/pieces/Chess_${
              piece.toLowerCase() + (piece.toLowerCase() == piece ? "d" : "l")
            }t45.svg`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </div>
    );
  }
}
