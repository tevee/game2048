export default function Tile({cell}) {
  
  return (
    <div className='tile'>{cell !== null && cell}</div>
  )
}