import { useSelector } from 'react-redux'
import GridSquare from './GridSquare'
import { shapes } from '../utils/blocks'

export default function GridBoard() {
  const { grid, shape, rotation, x, y, isRunning } = useSelector(state => ({
    grid: state.grid,
    shape: state.shape,
    rotation: state.rotation,
    x: state.x,
    y: state.y,
    isRunning: state.isRunning,
    speed: state.speed
  }));

  const block = shapes[shape][rotation]
  const blockColor = shape
  // map rows
  const gridSquares = grid.map((rowArray, row) => {
  // map columns
  return rowArray.map((square, col) => {
    // Find the block x and y on the shape grid
    // By subtracting the x and y from the col and the row we get the position of the upper left corner of the block array as if it was superimposed over the main grid
    const blockX = col - x
    const blockY = row - y
    let color = square
    // Map the current falling block to the grid.
    // For any squares that fall on the grid we need to look at the block array and see if there is a 1 in this case we use the block color.
    if (blockX >= 0 && blockX < block.length && blockY >= 0 && blockY < block.length) {
      color = block[blockY][blockX] === 0 ? color : blockColor
    }
    // Generate a unique key for every block
    const k = row * grid[0].length + col;
    // Generate a grid square
    return <GridSquare
      key={k}
      color={color} />
    })
  })

  return (
    <div className='grid-board'>
      {isRunning && gridSquares}
    </div>
  )
}
