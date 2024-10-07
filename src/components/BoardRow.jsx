import Tile from './Tile.jsx';

export default function BoardRow({row}) {
  
  return (
    <div className='boardRow'>
      {row.map((cell, colIdx) => (
        <Tile cell={cell} key={colIdx}/>
      ))}
    </div>
  )
}