import { Link } from 'react-router-dom'
import { btnGhost, btnPrimary } from '../components/ui'

export default function HomePage() {
  return (
    <section className="flex flex-col items-start py-12 sm:py-20">
      <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Learn a skill. Pass the exam. Prove it.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-neutral-600">
        Browse courses from teachers, work through the lessons, pass the final exam and
        earn a certificate anyone can verify online.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/courses" className={btnPrimary}>Browse courses</Link>
        <Link to="/register" className={btnGhost}>Create account</Link>
      </div>
    </section>
  )
}
