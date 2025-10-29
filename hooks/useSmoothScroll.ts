import { useEffect, useCallback } from "react";

export function useSmoothScroll() {
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Adjust this value to account for fixed header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;

      const id = link.getAttribute("href")?.slice(1);
      if (id) {
        e.preventDefault();
        scrollToSection(id);
      }
    };

    const links = document.querySelectorAll<HTMLAnchorElement>("a[href^='#']");
    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, [scrollToSection]);

  return scrollToSection;
}
