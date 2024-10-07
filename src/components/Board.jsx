import BoardRow from './BoardRow.jsx';

export default function Board({grid}) {

  return(
    <div className='grid'>
      {grid.map((row, rowIdx) => (
        <BoardRow row={row} key={rowIdx}/>
      ))}
    </div>
  )
}