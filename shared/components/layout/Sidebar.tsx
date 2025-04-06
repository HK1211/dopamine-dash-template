"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import menu from "@/meta/menu/menu.meta.json";
import { cn } from "@/lib/utils";
import { LucideIcon, Box, User, ChevronDown, ChevronRight } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  box: Box,
  user: User,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type MenuItem = {
  label: string;
  path: string;
  deps?: MenuItem[];
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [expandedMenus, setExpandedMenus] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const match = menu.menu.find((m) => m.path === pathname && m.redirectTo);
    if (match) {
      router.replace(match.redirectTo);
    }

    // 초기 활성 카테고리 설정
    if (menu.menu.length > 0 && !activeCategory) {
      setActiveCategory(menu.menu[0].path);
    }
  }, [pathname, activeCategory]);

  const toggleMenu = (path: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  // 현재 경로가 해당 메뉴의 deps에 포함되어 있는지 확인
  const isMenuOrDepsActive = (menuPath: string, deps?: MenuItem[]) => {
    if (pathname === menuPath) return true;
    if (!deps) return false;

    return deps.some((dep) => pathname === dep.path);
  };

  return (
    <>
      <div
        className={cn(
          "w-64 border-r bg-white min-h-screen z-40 transition-all duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 md:opacity-0"
        )}
      >
        {/* 카테고리 버튼 영역 */}
        <div className="p-2 border-b">
          <div className="flex flex-wrap gap-1 justify-center">
            {menu.menu.map((item) => {
              const Icon = iconMap[item.icon] || Box;
              const isActive = activeCategory === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => setActiveCategory(item.path)}
                  className={cn(
                    "px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-1",
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted/50 hover:bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 메뉴 영역 - 독립적인 스크롤 적용 */}
        <div className="flex-1 overflow-y-auto p-3">
          <nav className="space-y-2">
            {menu.menu
              .filter((item) => item.path === activeCategory)
              .map((item) => (
                <div key={item.path}>
                  <div className="pl-1 space-y-1">
                    {item.children.map((child) => {
                      const isActive = pathname === child.path;
                      const hasDeps = child.deps && child.deps.length > 0;
                      const isExpanded = expandedMenus[child.path];
                      const isChildActive = isMenuOrDepsActive(child.path, child.deps as MenuItem[]);

                      return (
                        <div key={child.path} className="mb-1">
                          <div
                            className={cn(
                              "flex items-center justify-between text-sm px-2 py-1.5 rounded cursor-pointer",
                              isChildActive && "bg-muted font-medium text-foreground",
                              !isChildActive && "hover:bg-muted/60"
                            )}
                            onClick={() => {
                              if (hasDeps) {
                                toggleMenu(child.path);
                              } else {
                                router.push(child.path);
                              }
                            }}
                          >
                            <span>{child.label}</span>
                            {hasDeps && (
                              <button
                                className="p-0.5 hover:bg-muted rounded-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMenu(child.path);
                                }}
                              >
                                {isExpanded ? (
                                  <ChevronDown className="size-3.5" />
                                ) : (
                                  <ChevronRight className="size-3.5" />
                                )}
                              </button>
                            )}
                          </div>

                          {/* Deps 메뉴 아이템 */}
                          {hasDeps && isExpanded && (
                            <div className="pl-3 mt-1 space-y-1 border-l-2 border-muted ml-2">
                              {(child.deps as MenuItem[]).map((dep) => {
                                const isDepActive = pathname === dep.path;
                                return (
                                  <Link
                                    key={dep.path}
                                    href={dep.path}
                                    className={cn(
                                      "block text-sm px-2 py-1 rounded hover:bg-muted",
                                      isDepActive && "bg-muted/70 font-medium"
                                    )}
                                  >
                                    {dep.label}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </nav>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity duration-300" onClick={onClose} />
      )}
    </>
  );
}
