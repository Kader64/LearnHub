import { Link, NavLink, Outlet } from "react-router-dom";
import { btnGhost, btnPrimary } from "../components/ui";

export function Layout() {

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b border-neutral-200 bg-white">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
                    <Link to="/" className="text-lg font-bold tracking-tight">Learn<span className="text-accent">Hub</span></Link>

                    <nav className="order-last flex w-full gap-5 overflow-x-auto sm:order-none sm:w-auto">
                        <NavLink to="/courses" className={"whitespace-nowrap text-sm"}>Courses</NavLink>
                        {/* MORE LATER FOR ROLES */}
                    </nav>

                    <div className="ml-auto flex items-center gap-3">
                        

                            {/* <button className={btnGhost} onClick={() => { }}>Sign out</button> */}
                        
                            <Link to="/login" className={btnGhost}>Sign in</Link>
                            <Link to="/register" className={btnPrimary}>Create account</Link>
                        
                    </div>

                </div>
            </header>
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8"><Outlet /></main>
            <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-400">LearnHub · portfolio project</footer>
        </div>
    )

}