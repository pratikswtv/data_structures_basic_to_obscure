import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { obscureMenuOptions } from '../data/obscureTopics'

const navItems = [
  { to: '/#part-8', label: 'Home', end: true },
  ...obscureMenuOptions.map((option) => ({
    to: option.path,
    label: option.title.split(' → ')[0],
    end: false,
  })),
]

export default function Layout() {
  const isHome = useLocation().pathname === '/'

  return (
    <div className={isHome ? 'min-h-screen' : 'comic-theme min-h-screen bg-black'}>
      {!isHome && (
      <header className="sticky top-0 z-10 border-b-2 border-white/20 bg-black/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <p className="shrink-0 text-lg font-bold text-gray-400">
            Data Structures Lecture
          </p>
          <nav className="flex flex-wrap justify-end gap-2">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `rounded-full border-2 px-3 py-1.5 text-sm font-bold transition sm:text-base ${
                    isActive
                      ? 'border-[#FFC93C] bg-[#FFC93C] text-black'
                      : 'border-white/30 text-gray-300 hover:border-white hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      )}

      <main className={isHome ? 'h-dvh overflow-hidden' : 'mx-auto max-w-6xl px-6 py-12'}>
        <Outlet />
      </main>
    </div>
  )
}
