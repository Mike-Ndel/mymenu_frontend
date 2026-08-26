import { useState } from 'react';
import { Menu, ChevronDown, Bell, MapPin } from 'lucide-react';
import { currentRestaurant, mockNotifications } from '../../data/restaurants';

function BranchSelector() {
  const [open, setOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState(currentRestaurant.branches[0]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-ink hover:bg-surface-muted"
      >
        <MapPin size={16} className="text-primary" />
        <span className="hidden sm:inline">{activeBranch.name}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-20 mt-2 w-56 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
            {currentRestaurant.branches.map((branch) => (
              <button
                key={branch.id}
                type="button"
                onClick={() => {
                  setActiveBranch(branch);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-sm hover:bg-surface-muted ${
                  branch.id === activeBranch.id ? 'font-semibold text-ink' : 'text-gray-600'
                }`}
              >
                {branch.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded-lg p-2 text-gray-500 hover:bg-surface-muted hover:text-ink"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-80 rounded-lg border border-gray-100 bg-white shadow-lg">
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="text-sm font-semibold text-ink">Notifications</p>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {mockNotifications.map((n) => (
                <div key={n.id} className="flex gap-3 border-b border-gray-50 px-4 py-3 last:border-0">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      n.unread ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-ink">{n.title}</p>
                    <p className="text-xs text-gray-500">{n.detail}</p>
                    <p className="mt-1 text-xs text-gray-400">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ProfileMenu() {
  return (
    <div className="flex items-center gap-2.5 border-l border-gray-200 pl-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
        {currentRestaurant.logoInitial}
      </span>
      <div className="hidden text-left leading-tight sm:block">
        <p className="text-sm font-semibold text-ink">{currentRestaurant.admin.name}</p>
        <p className="text-xs text-gray-500">{currentRestaurant.admin.role}</p>
      </div>
    </div>
  );
}

export default function Header({ onOpenMobileSidebar }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="rounded-md p-1.5 text-gray-500 hover:bg-surface-muted lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <div className="hidden lg:block">
          <p className="text-sm font-semibold text-ink">{currentRestaurant.name}</p>
        </div>
        <BranchSelector />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <NotificationsMenu />
        <ProfileMenu />
      </div>
    </header>
  );
}
