import { 
    ChartColumn, 
    Home, 
    NotepadText, 
    UserPlus, 
    Settings, 
    FileText,
    Users,
    CalendarCheck,
    ClipboardList,
    Bell,
    ClipboardCheck,
    UserCog
  } from "lucide-react";
  
  export const navbarLinks = {
      staff: [
          {
              title: "Staff Panel",
              links: [
                  { label: "Attendance Page", icon: CalendarCheck, path: "/staff/attendance" },
                  {
                      label: "Data Entry Page",
                      icon: ClipboardList,
                      path: "/staff/dataentry",
                      sublinks: [
                          { label: "Flights", path: "/staff/dataentry/flights" },
                          { label: "Hotels", path: "/staff/dataentry/hotels" },
                      ],
                  },
                  { label: "Pending Works", icon: ClipboardCheck, path: "/staff/pendingwork" },
                  { label: "Reminder to Customer", icon: Bell, path: "/staff/remindercustomer" },
              ],
          },
      ],
      admin: [
          {
              title: "Admin Panel",
              links: [
                  {
                      label: "Staff Attendence",
                      icon: CalendarCheck,
                      path: "/admin/staffattendence",
                  },
                  {
                      label: "Manage Staff",
                      icon: UserCog,
                      path: "/admin/managestaff",
                  },
                  {
                      label: "Assign Task",
                      icon: ClipboardCheck,
                      path: "/admin/assigntask",
                  },
                  { label: "Reminder to Customer", icon: Bell, path: "/staff/remindercustomer" },
              ],
          },
      ],
  };