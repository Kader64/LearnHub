import { Link } from 'react-router-dom'
import { btnPrimary, Empty } from '../components/ui'

export default function NotFoundPage() {
  return (
    <Empty title="Page not found">
      <Link to="/" className={`${btnPrimary} mt-4`}>Go home</Link>
    </Empty>
  )
}
