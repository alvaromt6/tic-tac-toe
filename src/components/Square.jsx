export const Square = ({ children, isSelected, isWinner, updateBoard, index }) => {
  // Cambiamos el estilo dependiendo de si es seleccionada o ganadora
  const className = `square ${isSelected ? 'is-selected' : ''} 
                            ${isWinner ? 'winner-cell' : ''}`;

  // Se llama a la función updateBoard con el índice de la celda en la que se hace clic
  const handleClick = () => {
      updateBoard(index);
  };

  return (
      // Se agrega un evento onClick al div que contiene la celda
      // y se le asigna la clase correspondiente según su estado
      <div onClick={handleClick} className={className}>
          {children}
      </div>
  );
};