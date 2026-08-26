import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, UtensilsCrossed, X } from 'lucide-react';
import { mainNavItems, settingsNav } from '../../utils/navigation';

function NavItem({ item, onNavigate }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary text-ink'
            : 'text-gray-300 hover:bg-white/5 hover:text-white',
        ].join(' ')
      }
    >
      <item.icon size={18} strokeWidth={2} />
      <span>{item.label}</span>
    </NavLink>
  );
}

function SettingsSection({ onNavigate }) {
  const location = useLocation();
  const isInsideSettings = location.pathname.startsWith(settingsNav.basePath);
  const [open, setOpen] = useState(isInsideSettings);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={[
          'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          isInsideSettings && !open
            ? 'text-primary'
            : 'text-gray-300 hover:bg-white/5 hover:text-white',
        ].join(' ')}
      >
        <span className="flex items-center gap-3">
          <settingsNav.icon size={18} strokeWidth={2} />
          {settingsNav.label}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="mt-1 space-y-1 border-l border-white/10 pl-4">
          {settingsNav.children.map((child) => (
            <NavItem key={child.path} item={child} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const content = (
    <div className="flex h-full flex-col bg-ink">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-ink">
            <UtensilsCrossed size={18} strokeWidth={2.5} />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            MyMenu
          </span>
        </div>
        <button
          type="button"
          onClick={onCloseMobile}
          className="rounded-md p-1 text-gray-400 hover:bg-white/5 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4 scrollbar-thin">
        {mainNavItems.map((item) => (
          <NavItem key={item.path} item={item} onNavigate={onCloseMobile} />
        ))}

        <div className="!mt-4 border-t border-white/10 pt-4">
          <SettingsSection onNavigate={onCloseMobile} />
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:shrink-0">{content}</aside>

      {/* Mobile sidebar (drawer) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-64">{content}</div>
        </div>
      )}
    </>
  );
}
