import { useState, useEffect, useRef } from "react";
import { styles, type Profile } from "../../App";
import { supabase } from "../../supabase-client";
import { useNavigate, useParams } from "react-router-dom";

export function Play({ currentProfile }: { currentProfile: Profile | null }) {
  const nav = useNavigate();
  const { gameID } = useParams();
  const boardTheme = ["#adadadff", "#222222ff"];
  const [currentBoard, setCurrentBoard] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
  );
  const dragInfo = useRef<{
    piece: string;
    fromRow: number;
    fromCol: number;
  } | null>(null);

  function handleDragStart(
    e: React.DragEvent<HTMLImageElement>,
    piece: string,
    row: number,
    col: number
  ) {
    dragInfo.current = { piece, fromRow: row, fromCol: col };
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
    toRow: number,
    toCol: number
  ) {
    e.preventDefault();
    if (!dragInfo.current) return;

    const { piece, fromRow, fromCol } = dragInfo.current;
    dragInfo.current = null;

    // Convert FEN to 2D array
    const boardArr = fenToArray(currentBoard);

    // Move piece
    console.log(piece);
    boardArr[toRow][toCol] = piece;
    boardArr[fromRow][fromCol] = null;

    // Convert back to FEN
    const newFEN = arrayToFen(boardArr);
    setCurrentBoard(newFEN);
  }

  const getBoard = async () => {
    const { error, data } = await supabase
      .from("games")
      .select("*")
      .eq("id", gameID)
      .single();
    if (!error) {
      setCurrentBoard(data.currentBoard);
    } else {
      nav("/play");
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div style={{ justifyItems: "center" }}>
      <div style={styles.container}>
        <h1>Chess Board</h1>
        <Resizable>
          {currentBoard.split("/").map((row, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                height: "12.5%",
                display: "flex",
              }}
            >
              {expandFENRow(row, i)}
            </div>
          ))}
        </Resizable>
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
        onDragOver={(e) => e.preventDefault()} // must call this to allow dropping
        onDrop={(e) => handleDrop(e, row, col)}
        style={{
          width: "12.5%",
          height: "100%",
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "6vmin",
        }}
      >
        {piece && (
          <img
            draggable
            onDragStart={(e) => handleDragStart(e, piece, row, col)}
            src={`/pieces/Chess_${
              piece.toLowerCase() + (piece.toLowerCase() == piece ? "d" : "l")
            }t45.svg`}
            style={{
              width: "100%",
              aspectRatio: 1,
              objectFit: "contain",
              pointerEvents: "auto",
            }}
          />
        )}
      </div>
    );
  }
}

export function Resizable({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [width, setWidth] = useState(window.innerWidth * 0.4);
  const [height, setHeight] = useState(window.innerWidth * 0.4);

  const startX = useRef(0);
  const startY = useRef(0);
  const startWidth = useRef(0);
  const startHeight = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startX.current = e.clientX;
    startY.current = e.clientY;
    startWidth.current = width;
    startHeight.current = height;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const delta = Math.max(
      e.clientX - startX.current,
      e.clientY - startY.current
    );
    const newSize = startWidth.current + delta;
    const clamped = Math.min(Math.max(400, newSize), 1000);
    setWidth(clamped);
    setHeight(clamped);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      style={{
        ...styles.container,
        position: "relative",
        width,
        height,
        overflow: "hidden",
        border: "1px solid #888",
      }}
    >
      {children}
      <div
        style={{
          width: "12px",
          height: "12px",
          background: "blue",
          opacity: 0.7,
          position: "absolute",
          bottom: "2px",
          right: "2px",
          borderRadius: "2px",
          cursor: "se-resize",
          transition: "opacity 0.2s",
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
      />
    </div>
  );
}

function fenToArray(fen: string): (string | null)[][] {
  return fen.split("/").map((row) => {
    const result: (string | null)[] = [];
    for (const char of row) {
      const n = parseInt(char);
      if (isNaN(n)) result.push(char);
      else for (let i = 0; i < n; i++) result.push(null);
    }
    return result;
  });
}

function arrayToFen(board: (string | null)[][]): string {
  return board
    .map((row) => {
      let fenRow = "";
      let emptyCount = 0;
      for (const cell of row) {
        if (cell === null) emptyCount++;
        else {
          if (emptyCount > 0) {
            fenRow += emptyCount.toString();
            emptyCount = 0;
          }
          fenRow += cell;
        }
      }
      if (emptyCount > 0) fenRow += emptyCount.toString();
      return fenRow;
    })
    .join("/");
}
