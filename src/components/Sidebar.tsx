'use client';
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Show hamburger only when sidebar is closed */}
      {!isOpen && (
        <div className="hamburger" onClick={toggleSidebar}>
          ☰
        </div>
      )}

      <div className="container">
        <aside
          ref={sidebarRef}
          className={`sidebar ${isOpen ? "open" : ""}`}
        >
          <h3 className="sidebar-title">विभागीय मूल्यांकन</h3>
          <ul className="sidebar-list">
            <li><Link href="/ease-of-living">सुकर जीवनमान</Link></li>
            <li><Link href="/cleanliness">स्वच्छता</Link></li>
            <li><Link href="/grievance-redressal">तक्रार निवारण</Link></li>
            <li><Link href="/office-amenities">कार्यालयीन सोई सुविधा</Link></li>
            <li><Link href="/visits">क्षेत्रीय कार्यालयांना भेटी</Link></li>
            <li><Link href="/e-office">ई-ऑफिस प्रणाली</Link></li>
            <li><Link href="/investment-promotion">गुंतवणूक प्रोत्साहन</Link></li>
            <li><Link href="/innovative-initiatives">नाविन्यपूर्ण उपक्रम</Link></li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
