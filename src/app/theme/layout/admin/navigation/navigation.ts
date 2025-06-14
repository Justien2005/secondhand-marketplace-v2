export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  task?: string;

  children?: NavigationItem[];
}
export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/pages/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'product-listing',
        title: 'Product Listing',
        type: 'item',
        url: '/pages/product-admin/product-listing',
        icon: 'feather icon-home',
        classes: 'nav-item',
        task: 'ADMIN_PRODUCT_LISTING',
      },
      {
        id: 'seller-list',
        title: 'Seller List',
        type: 'item',
        url: '/pages/seller/seller-list',
        icon: 'feather icon-home',
        classes: 'nav-item',
        task: 'ADMIN_SELLER_LIST',
        children: [
          {
            id: 'seller-details',
            title: 'Seller Details',
            type: 'item',
            url: '/pages/seller/seller-details/:seller_id',
            icon: 'feather icon-user',
            classes: 'nav-item',
          }
        ]
      },
      {
        id: 'seller-my-product',
        title: 'My Product',
        type: 'item',
        url: '/pages/seller-pages/seller-product-list',
        icon: 'feather icon-package',
        classes: 'nav-item',
        task: 'SELLER_PRODUCT_LIST'
      },
      {
        id: 'product-catalog',
        title: 'Product Catalog',
        type: 'item',
        url: '/pages/buyer-pages/product-catalog',
        icon: 'feather icon-shopping-cart',
        classes: 'nav-item',
        task: 'PRODUCT_CATALOG',
      },
      {
        id: 'buyer-order',
        title: 'My Order',
        type: 'item',
        url: '/pages/buyer-pages/buyer-order',
        icon: 'feather icon-package',
        classes: 'nav-item',
        task: 'BUYER_ORDER'
      },
      {
        id: 'admin-order-list',
        title: 'Order List',
        type: 'item',
        url: '/pages/admin-order-list/list',
        icon: 'feather icon-package',
        classes: 'nav-item',
        task: 'ADMIN_ORDER_LIST'
      },
      {
        id: 'wishlist',
        title: 'Wishist',
        type: 'item',
        url: '/pages/buyer-pages/wishlist',
        icon: 'feather icon-heart',
        classes: 'nav-item',
        task: 'BUYER_WISHLIST'
      },
      {
        id: 'admin-setup',
        title: 'Setup',
        type: 'item',
        url: '/pages/admin-setup',
        icon: 'feather icon-home',
        classes: 'nav-item',
        task: 'ADMIN_SETUP',
      },
    ]
  },
];

export function filterNavigationItems(items: NavigationItem[], allowedTasks: string[]): NavigationItem[] {
  return items.map(item => ({
    ...item,
    hidden: item.task ? !allowedTasks.includes(item.task) : item.hidden,
    children: item.children ? filterNavigationItems(item.children, allowedTasks) : undefined
  }));
}

// export const NavigationItems: NavigationItem[] = [
//   {
//     id: 'navigation',
//     title: 'Navigation',
//     type: 'group',
//     icon: 'icon-navigation',
//     children: [
//       {
//         id: 'dashboard',
//         title: 'Dashboard',
//         type: 'item',
//         url: '/pages/dashboard',
//         icon: 'feather icon-home',
//         classes: 'nav-item'
//       }
//     ]
//   },
//   {
//     id: 'ui-element',
//     title: 'UI ELEMENT',
//     type: 'group',
//     icon: 'icon-ui',
//     children: [
//       {
//         id: 'basic',
//         title: 'Component',
//         type: 'collapse',
//         icon: 'feather icon-box',
//         children: [
//           {
//             id: 'button',
//             title: 'Button',
//             type: 'item',
//             url: '/basic/button'
//           },
//           {
//             id: 'badges',
//             title: 'Badges',
//             type: 'item',
//             url: '/basic/badges'
//           },
//           {
//             id: 'breadcrumb-pagination',
//             title: 'Breadcrumb & Pagination',
//             type: 'item',
//             url: '/basic/breadcrumb-paging'
//           },
//           {
//             id: 'collapse',
//             title: 'Collapse',
//             type: 'item',
//             url: '/basic/collapse'
//           },
//           {
//             id: 'tabs-pills',
//             title: 'Tabs & Pills',
//             type: 'item',
//             url: '/basic/tabs-pills'
//           },
//           {
//             id: 'typography',
//             title: 'Typography',
//             type: 'item',
//             url: '/basic/typography'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     id: 'forms',
//     title: 'Forms & Tables',
//     type: 'group',
//     icon: 'icon-group',
//     children: [
//       {
//         id: 'forms-element',
//         title: 'Form Elements',
//         type: 'item',
//         url: '/forms/basic',
//         classes: 'nav-item',
//         icon: 'feather icon-file-text'
//       },
//       {
//         id: 'tables',
//         title: 'Tables',
//         type: 'item',
//         url: '/tables/bootstrap',
//         classes: 'nav-item',
//         icon: 'feather icon-server'
//       }
//     ]
//   },
//   {
//     id: 'chart-maps',
//     title: 'Chart',
//     type: 'group',
//     icon: 'icon-charts',
//     children: [
//       {
//         id: 'apexChart',
//         title: 'ApexChart',
//         type: 'item',
//         url: 'apexchart',
//         classes: 'nav-item',
//         icon: 'feather icon-pie-chart'
//       }
//     ]
//   },
//   {
//     id: 'pages',
//     title: 'Pages',
//     type: 'group',
//     icon: 'icon-pages',
//     children: [
//       {
//         id: 'auth',
//         title: 'Authentication',
//         type: 'collapse',
//         icon: 'feather icon-lock',
//         children: [
//           {
//             id: 'signup',
//             title: 'Sign up',
//             type: 'item',
//             url: '/auth/signup',
//             target: true,
//             breadcrumbs: false
//           },
//           {
//             id: 'signin',
//             title: 'Sign in',
//             type: 'item',
//             url: '/auth/signin',
//             target: true,
//             breadcrumbs: false
//           }
//         ]
//       },
//       {
//         id: 'sample-page',
//         title: 'Sample Page',
//         type: 'item',
//         url: '/sample-page',
//         classes: 'nav-item',
//         icon: 'feather icon-sidebar'
//       },
//       {
//         id: 'disabled-menu',
//         title: 'Disabled Menu',
//         type: 'item',
//         url: 'javascript:',
//         classes: 'nav-item disabled',
//         icon: 'feather icon-power',
//         external: true
//       },
//       {
//         id: 'buy_now',
//         title: 'Buy Now',
//         type: 'item',
//         icon: 'feather icon-book',
//         classes: 'nav-item',
//         url: 'https://codedthemes.com/item/datta-able-angular/',
//         target: true,
//         external: true
//       }
//     ]
//   }
// ];
