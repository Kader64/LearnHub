import { Link } from 'react-router-dom'
import { btnPrimary } from '../components/ui'

export default function HomePage() {
  return (
    <div className="flex justify-center">
      <section className="flex flex-col center py-12 sm:py-20 justify-center">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Learn a skill. Pass the exam. Prove it.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-neutral-600">
          Browse courses from teachers, work through the lessons, pass the final exam and
          earn a certificate anyone can verify online.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/courses" className={btnPrimary}>Start journey</Link>
        </div>
      </section>
    </div>

  )
}
