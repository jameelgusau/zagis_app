// import {
//   Tag,
//   Users,
//   Settings,
//   Bookmark,
//   SquarePen,
//   LayoutGrid,
//   LucideIcon
// } from "lucide-react";

// type Submenu = {
//   href: string;
//   label: string;
//   active?: boolean;
// };

// type Menu = {
//   href: string;
//   label: string;
//   active?: boolean;
//   icon: LucideIcon;
//   submenus?: Submenu[];
// };

// type Group = {
//   groupLabel: string;
//   menus: Menu[];
// };

// export function getMenuList(pathname: string): Group[] {
//   return [
//     {
//       groupLabel: "",
//       menus: [
//         {
//           href: "/dashboard",
//           label: "Dashboard",
//           icon: LayoutGrid,
//           submenus: []
//         }
//       ]
//     },
//     {
//       groupLabel: "Contents",
//       menus: [
//         {
//           href: "",
//           label: "Posts",
//           icon: SquarePen,
//           submenus: [
//             {
//               href: "/posts",
//               label: "All Posts"
//             },
//             {
//               href: "/posts/new",
//               label: "New Post"
//             }
//           ]
//         },
//         {
//           href: "/categories",
//           label: "Categories",
//           icon: Bookmark
//         },
//         {
//           href: "/tags",
//           label: "Tags",
//           icon: Tag
//         }
//       ]
//     },
//     {
//       groupLabel: "Settings",
//       menus: [
//         {
//           href: "/users",
//           label: "Users",
//           icon: Users
//         },
//         {
//           href: "/account",
//           label: "Account",
//           icon: Settings
//         }
//       ]
//     }
//   ];
// }

import {
  // ShieldUser,
  Calendar,
  // School,
  Users,
  LayoutGrid,
  LucideIcon,
  Landmark,
  ShieldHalf,
  Settings,
  // MapPinHouse,
  // Bell,
  UserRoundShield,
  Archive
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/home",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "",
          label: "Registry",
          icon: Archive,
          submenus: [
            {
              href: "/records",
              label: "Records"
            },
            // {
            //   href: "/identifiedbeneficiaries",
            //   label: "Identify Beneficiaries"
            // }
          ]
        },
        {
          href: "",
          label: "Lands",
          icon: Calendar,
          submenus: [
            {
              href: "/landreport",
              label: "Land Report"
            },
            {
              href: "/land_clearance",
              label: "Clearance"
            }
          ]
        },
        {
          href: "",
          label: "Survey",
          icon: Calendar,
          submenus: [
            {
              href: "/coordinates",
              label: "Coordinates"
            },
            {
              href: "/survey-clearance",
              label: "Clearance"
            }
          ]
        },
        {
          href: "",
          label: "Town Planing",
          icon: Calendar,
          submenus: [
            {
              href: "/landuse",
              label: "Land Use"
            },
            {
              href: "/townplanning-clearance",
              label: "Clearance"
            }
          ]
        },
        {
          href: "",
          label: "Admin Department",
          icon: UserRoundShield,
          submenus: [
            {
              href: "/users",
              label: "Users",
            },
            {
              href: "/departments",
              label: "Departments",
            },
            {
              href: "/ranks",
              label: "Ranks",
            }
          ]
        },
         {
          href: "",
          label: "Settings",
          icon: Settings,
          submenus: [
            {
              href: "/zones",
              label: "Zones"
            },
            {
              href: "/lgas",
              label: "Local Government Areas"
            },
            {
              href: "/",
              label: "Terms"
            }
          ]
        },
        // {
        //   href: "/notifications",
        //   label: "Notifications",
        //   icon: Bell
        // },
       
      ]
    },
    // {
    //   groupLabel: "Contents",
    //   menus: [

    //   ]
    // },
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       icon: Users
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       icon: Settings
    //     }
    //   ]
    // }
  ];
}
