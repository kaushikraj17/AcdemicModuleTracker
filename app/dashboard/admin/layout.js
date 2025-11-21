"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  BookOpen, 
  FileText, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  LogOut
} from "lucide-react";

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = [
    { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Add Student", href: "/dashboard/admin/addStudent", icon: UserPlus },
    { name: "Add Faculty", href: "/dashboard/admin/addFaculty", icon: Users },
    { name: "Add Course", href: "/dashboard/admin/addCourse", icon: BookOpen },
    { name: "Reports", href: "/dashboard/admin/reports", icon: FileText },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      
      {/* TOP NAVBAR */}
      <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-30">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Academic Module Tracker</span>
        </div>


        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700"
          >
            <User className="w-5 h-5" />
            <span>Kaushik Rajbongshi</span>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <button
                  className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setDropdownOpen(false);
                    // Add logout logic here
                    console.log("Logout clicked");
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1 pt-16">
        
        {/* MOBILE OVERLAY */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* LEFT SIDEBAR */}
        <aside
          className={`bg-[#d3dce6] h-[calc(100vh-4rem)] fixed lg:sticky top-16 left-0 z-50 transition-all duration-300 ease-in-out ${
            collapsed ? "w-20" : "w-64"
          } ${
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full p-4">
            {/* Header with Collapse Button */}
            <div className="flex items-center justify-between mb-6">
              {!collapsed && (
                <h2 className="text-lg font-bold text-gray-800 transition-opacity duration-200">
                  Admin Panel
                </h2>
              )}
              <button
                className="p-2 hover:bg-gray-400 rounded-lg transition-colors ml-auto"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? (
                  <ChevronRight className="w-8 h-8 text-blue-600" />
                ) : (
                  <ChevronLeft className="w-8 h-8 text-blue-600" />
                )}
              </button>
            </div>

            {/* Menu Links */}
            <nav className="space-y-2 flex-1">
              {links.map((link) => {
                const active = pathname === link.href;
                const Icon = link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-[#c0ccd8] font-semibold text-gray-900 shadow-sm"
                        : "hover:bg-[#c9d4df] text-gray-700"
                    } ${collapsed ? "justify-center" : ""}`}
                    title={collapsed ? link.name : ""}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${active ? "text-indigo-600" : ""}`} />
                    {!collapsed && (
                      <span className="transition-opacity duration-200">
                        {link.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* MOBILE MENU BUTTON */}
        <button
          className="fixed top-20 left-4 z-30 lg:hidden bg-indigo-600 text-white p-3 rounded-lg shadow-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-gray-100 p-4 lg:p-8 overflow-y-auto">
          <div className="lg:hidden h-16" /> {/* Spacer for mobile menu button */}
          {children}
        </main>
      </div>
    </div>
  );
}