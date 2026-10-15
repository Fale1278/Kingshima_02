import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CalendarDays, 
  Trophy, 
  UserCircle, 
  ChevronLeft, 
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'My Programs', icon: BookOpen, path: '/dashboard/programs' },
    { name: 'Community', icon: Users, path: '/dashboard/community' },
    { name: 'Events', icon: CalendarDays, path: '/dashboard/events' },
    { name: 'Achievements', icon: Trophy, path: '/dashboard/achievements' },
    { name: 'My Profile', icon: UserCircle, path: '/dashboard/profile' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} glass`}>
      <button 
        className={styles.toggle} 
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle Sidebar"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <div className={styles.logoContainer}>
        <span className={styles.logoIcon}>✧</span>
        {!collapsed && <span className={styles.logoText}>Kingshima</span>}
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
          >
            <item.icon size={20} className={styles.icon} />
            {!collapsed && <span className={styles.linkText}>{item.name}</span>}
            {isActive(item.path) && <div className={styles.activeIndicator} />}
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        <button className={styles.logoutBtn} onClick={logout}>
          <LogOut size={20} className={styles.icon} />
          {!collapsed && <span className={styles.linkText}>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
