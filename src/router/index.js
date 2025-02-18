import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/front/HomeView.vue";
import { components } from "vuetify/dist/vuetify-labs.js";
import { useAuthStore } from "../stores/auth/auth";
import { storeToRefs } from "pinia";

const userRoutes = [
  { type: "customers", subRoutes: ["show-customer-information"] },
  {
    type: "drivers",
    subRoutes: [
      "show-driver-information",
      "add-driver",
      "edit-driver-information",
    ],
  },
  {
    type: "moderators",
    subRoutes: [
      "show-moderator-information",
      "add-moderator",
      "edit-moderator-information",
    ],
  },
];

// Generate dynamic routes
const dynamicRoutes = userRoutes.flatMap((user) => {
  // Main route for each user type
  const mainRoute = {
    path: user.type,
    name: `dashboard-${user.type}`,
    meta: {
      title: user.type.charAt(0).toUpperCase() + user.type.slice(1),
    },
    component: () => import("@/views/dashboard/user/UserView.vue"),
  };

  const subRoutes = user.subRoutes.map((subRoute) => {
    let componentPath = "";

    if (subRoute.includes("add") || subRoute.includes("edit")) {
      componentPath = "/src/views/dashboard/user/AddUserView.vue";
    } else {
      componentPath = "/src/views/dashboard/user/ShowUserView.vue";
    }
    return {
      path: `${user.type}/${subRoute}`,
      name: `dashboard-${subRoute}`,
      meta: {
        title: subRoute.replaceAll("-", " "),
      },
      component: () => import(componentPath),
    };
  });

  // Return both main and sub-routes
  return [mainRoute, ...subRoutes];
});

const routes = [
  {
    path: "/",
    component: () => import("@/views/layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        meta: {
          title: "Organick",
        },
        component: HomeView,
      },
      {
        path: "/about",
        name: "about",
        meta: {
          title: "About",
        },
        component: () => import("@/views/front/AboutView.vue"),
      },
      {
        path: "/shop",
        name: "shop",
        meta: {
          title: "Shop",
        },
        component: () => import("@/views/front/ShopView.vue"),
      },
      {
        path: "/cart",
        name: "cart",
        meta: {
          title: "Cart",
          requiresAuth: true,
        },
        component: () => import("@/views/front/CartView.vue"),
      },
      {
        path: "/shop/products/:product",
        name: "single-shop",
        meta: {
          title: "Shop",
        },
        component: () => import("@/views/front/SingleShopView.vue"),
      },
      {
        path: "/news",
        name: "blogs",
        meta: {
          title: "News",
        },
        component: () => import("@/views/front/BlogsView.vue"),
      },
      {
        path: "/news/single",
        name: "show-blog",
        meta: {
          title: "News",
        },
        component: () => import("@/views/front/SingleBlogView.vue"),
      },
      {
        path: "/services",
        name: "services",
        meta: {
          title: "Services",
        },
        component: () => import("@/views/front/ServiceView.vue"),
      },
      {
        path: "/services/single-service",
        name: "single-service",
        meta: {
          title: "Services",
        },
        component: () => import("@/views/front/SingleServiceView.vue"),
      },
      {
        path: "/portfolio",
        name: "portfolio",
        meta: {
          title: "Portfolio",
        },
        component: () => import("@/views/front/PortfolioView.vue"),
      },
      {
        path: "/portfolio/single",
        name: "single-portfolio",
        meta: {
          title: "Protfolio",
        },
        component: () => import("@/views/front/SinglePortfolioView.vue"),
      },
      {
        path: "/our-teams",
        name: "our-teams",
        meta: {
          title: "Our Team",
        },
        component: () => import("@/views/front/TeamView.vue"),
      },
      {
        path: "/contact-us",
        name: "contact",
        meta: {
          title: "Contact Us",
        },
        component: () => import("@/views/front/ContactView.vue"),
      },
      {
        path: "/login",
        name: "login",
        meta: {
          title: "Login",
          requiresGuest: true,
        },
        component: () => import("@/views/auth/UserLoginView.vue"),
      },
      {
        path: "/admin/login",
        name: "admin-login",
        meta: {
          title: "Login",
          requiresGuest: true,
        },
        component: () => import("@/views/auth/MemberLoginView.vue"),
      },
      {
        path: "/team-member/login",
        name: "team-member-login",
        meta: {
          title: "Login",
          requiresGuest: true,
        },
        component: () => import("@/views/auth/MemberLoginView.vue"),
      },
      {
        path: "/team-supported/login",
        name: "team-supported-login",
        meta: {
          title: "Login",
          requiresGuest: true,
        },
        component: () => import("@/views/auth/MemberLoginView.vue"),
      },
      {
        path: "/my-orders",
        name: "orders",
        meta: {
          title: "Orders",
          requiresAuth: true,
        },
        component: () => import("@/views/front/OrdersView.vue"),
      },
      {
        path: "/my-profile",
        name: "profile",
        meta: {
          title: "Profile",
          requiresAuth: true,
        },
        component: () => import("@/views/front/ProfileView.vue"),
      },
      {
        path: "/my-favorites",
        name: "favorite",
        meta: {
          title: "Favorite",
          requiresAuth: true,
        },
        component: () => import("@/views/front/FavoritesView.vue"),
      },
      {
        path: "/products/rating",
        name: "rating-product",
        meta: {
          title: "Rating",
          requiresAuth: true,
        },
        component: () => import("@/views/front/RatingProductView.vue"),
      },

      {
        path: "/register",
        name: "register",
        meta: {
          title: "Register",
        },
        component: () => import("@/views/auth/RegisterView.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "page-not-found",
        meta: {
          title: "Page Not Found",
        },
        component: () => import("@/views/front/PageNotFoundView.vue"),
      },
    ],
  },
  {
    path: "/checkout",
    name: "checkout",
    meta: {
      title: "Checkout",
      requiresAuth: true,
    },
    component: () => import("@/views/front/CheckoutView.vue"),
  },
  {
    // path: "/dashboard",
    path: "/:role/dashboard",
    component: () => import("@/views/layouts/DashboardLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      const validRoles = ["admin", "driver", "moderator"];
      if (validRoles.includes(to.params.role)) {
        next();
      } else {
        next({ name: "page-not-found" });
      }
    },
    children: [
      {
        path: "",
        name: "dashboard",
        meta: {
          title: "Dashboard",
        },
        component: () => import("@/views/dashboard/DashboardView.vue"),
      },
      {
        path: "categories",
        name: "dashboard-categories",
        meta: {
          title: "Categories",
        },
        component: () =>
          import("@/views/dashboard/category/CategoriesView.vue"),
      },
      {
        path: "categories/add-new-category",
        name: "dashboard-add-category",
        meta: {
          title: "Add Category",
        },
        component: () =>
          import("@/views/dashboard/category/AddCategoryView.vue"),
      },
      {
        path: "categories/:category/edit",
        name: "dashboard-edit-category",
        meta: {
          title: "Edit Category",
        },
        component: () =>
          import("@/views/dashboard/category/AddCategoryView.vue"),
      },
      {
        path: "categories/:category/show",
        name: "dashboard-show-category",
        meta: {
          title: "Show Category",
        },
        component: () =>
          import("@/views/dashboard/category/ShowCategoryView.vue"),
      },
      {
        path: "products",
        name: "dashboard-products",
        meta: {
          title: "Products",
        },
        component: () => import("@/views/dashboard/product/ProductsView.vue"),
      },
      {
        path: "products/trash",
        name: "dashboard-products-trash",
        meta: {
          title: "Products Trash",
        },
        component: () =>
          import("@/views/dashboard/product/ProductsTrashedView.vue"),
      },
      {
        path: "products/add-new-product",
        name: "dashboard-add-product",
        meta: {
          title: "Add Products",
        },
        component: () => import("@/views/dashboard/product/AddProductView.vue"),
      },
      {
        path: "products/:product/edit",
        name: "dashboard-edit-product",
        meta: {
          title: "Edit Products",
        },
        component: () => import("@/views/dashboard/product/AddProductView.vue"),
      },
      {
        path: "products/:product/show",
        name: "dashboard-show-product",
        meta: {
          title: "Show Product",
        },
        component: () =>
          import("@/views/dashboard/product/ShowProductView.vue"),
      },
      {
        path: "blogs",
        name: "dashboard-blogs",
        meta: {
          title: "Blogs",
        },
        component: () => import("@/views/dashboard/blog/BlogsView.vue"),
      },
      {
        path: "blogs/add-new-blog",
        name: "dashboard-add-blog",
        meta: {
          title: "Add Blogs",
        },
        component: () => import("@/views/dashboard/blog/AddBlogView.vue"),
      },
      {
        path: "blogs/edit",
        name: "dashboard-edit-blog",
        meta: {
          title: "Edit Blogs",
        },
        component: () => import("@/views/dashboard/blog/AddBlogView.vue"),
      },
      // {
      //   path: "blogs/:blog/show",
      //   name: "dashboard-show-blog",
      //   meta: {
      //     title: "show Blogs",
      //   },
      //   component: () => import("@/views/dashboard/blog/ShowBlogView.vue"),
      // },
      {
        path: "messages",
        name: "dashboard-messages",
        meta: {
          title: "Messages",
        },
        component: () => import("@/views/dashboard/message/MessagesView.vue"),
      },
      {
        path: "messages/show",
        name: "dashboard-message-show",
        meta: {
          title: "Messages",
        },
        component: () =>
          import("@/views/dashboard/message/ShowMessageView.vue"),
      },
      {
        path: "orders",
        name: "dashboard-orders",
        meta: {
          title: "Orders",
        },
        component: () => import("@/views/dashboard/order/OrderView.vue"),
      },
      {
        path: "orders/:order/show",
        name: "dashboard-show-order",
        meta: {
          title: "Show Orders",
        },
        component: () => import("@/views/dashboard/order/ShowOrderView.vue"),
      },
      {
        path: "order/users",
        name: "dashboard-users",
        meta: {
          title: "Users",
        },
        component: () => import("@/views/dashboard/DashboardView.vue"),
      },
      {
        path: "users/subscribers",
        name: "dashboard-subscribers",
        meta: {
          title: "Users",
        },
        component: () => import("@/views/dashboard/SubscribersView.vue"),
      },
      // {
      //   path: "customers",
      //   name: "dashboard-customers",
      //   meta: {
      //     title: "Customers",
      //   },
      //   component: () => import("@/views/dashboard/user/UserView.vue"),
      // },
      // {
      //   path: "drivers",
      //   name: "dashboard-drivers",
      //   meta: {
      //     title: "Drivers",
      //   },
      //   component: () => import("@/views/dashboard/user/UserView.vue"),
      // },
      // {
      //   path: "Moderators",
      //   name: "dashboard-moderators",
      //   meta: {
      //     title: "Moderators",
      //   },
      //   component: () => import("@/views/dashboard/user/UserView.vue"),
      // },
      ...dynamicRoutes,
      // {
      //   path: "users/show-user-information",
      //   name: "dashboard-show-user",
      //   meta: {
      //     title: "Show User",
      //   },
      //   component: () => import("@/views/dashboard/user/ShowUserView.vue"),
      // },
      // {
      //   path: "team-members",
      //   name: "dashboard-team",
      //   meta: {
      //     title: "Team Members",
      //   },
      //   component: () => import("@/views/dashboard/team/TeamView.vue"),
      // },
      // {
      //   path: "users/add-user",
      //   name: "dashboard-add-user",
      //   meta: {
      //     title: "Add User",
      //   },
      //   component: () => import("@/views/dashboard/user/AddUserView.vue"),
      // },
      // {
      //   path: "users/edit-user-information",
      //   name: "dashboard-edit-user-information",
      //   meta: {
      //     title: "Edit User",
      //   },
      //   component: () => import("@/views/dashboard/user/AddUserView.vue"),
      // },
      {
        path: "services",
        name: "dashboard-services",
        meta: {
          title: "Services",
        },
        component: () => import("@/views/dashboard/service/ServicesView.vue"),
      },
      {
        path: "services/:service/configration/edit",
        name: "dashboard-edit-service",
        meta: {
          title: "Edit Service Configration",
        },
        component: () =>
          import("@/views/dashboard/service/EditServiceView.vue"),
      },
      // {
      //   path: "team-members/show-member-info/",
      //   name: "dashboard-show-member-info",
      //   meta: {
      //     title: "Member Info",
      //   },
      //   component: () => import("@/views/dashboard/team/ShowMemberView.vue"),
      // },
      // {
      //   path: "team-members/edit-member-info/",
      //   name: "dashboard-edit-member-info",
      //   meta: {
      //     title: "Edit Member Info",
      //   },
      //   component: () => import("@/views/dashboard/team/AddMemberView.vue"),
      // },
      {
        path: "roles",
        name: "dashboard-roles",
        meta: {
          title: "Roles",
        },
        component: () => import("@/views/dashboard/roles/RolesView.vue"),
      },
      {
        path: "roles/add-role",
        name: "dashboard-add-role",
        meta: {
          title: "Add Roles",
        },
        component: () => import("@/views/dashboard/roles/AddRoleView.vue"),
      },
      {
        path: "roles/:role/edit",
        name: "dashboard-edit-role",
        meta: {
          title: "Edit Roles",
        },
        component: () => import("@/views/dashboard/roles/AddRoleView.vue"),
      },
      {
        path: "payment-methods",
        name: "dashboard-payment-methods",
        meta: {
          title: "PaymentMethods",
        },
        component: () =>
          import("@/views/dashboard/paymentMethod/PaymentMethodsView.vue"),
      },
      {
        path: "payment-methods/eidt",
        name: "dashboard-eidt-payment-method",
        meta: {
          title: "Edit PaymentMethods",
        },
        component: () =>
          import("@/views/dashboard/paymentMethod/EditPaymentMethodView.vue"),
      },
      {
        path: "reports",
        name: "dashboard-reports",
        meta: {
          title: "Reports",
        },
        component: () => import("@/views/dashboard/report/ReportView.vue"),
      },
      {
        path: "cities",
        name: "dashboard-cities",
        meta: {
          title: "Cities",
        },
        component: () => import("@/views/dashboard/city/CitiesView.vue"),
      },
      // {
      //   path: "users/subscribers",
      //   name: "dashboard-subscribers",
      //   meta: {
      //     title: "Users",
      //   },
      //   component: () => import("@/views/dashboard/SubscribersView.vue"),
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  document.title = to.meta.title;
  console.log("include", to.fullPath.includes("admin"));
  if (to.meta.requiresAuth) {
    if (useAuthStore().isAuth) {
      next();
    } else {
      if (to.fullPath.includes("admin")) {
        next({ name: "admin-login" });
      }
      if (to.fullPath.includes("driver")) {
        next({ name: "driver-login" });
      }
      if (to.fullPath.includes("moderator")) {
        next({ name: "moderator-login" });
      }
      next({ name: "login" });
    }
  } else if (to.meta.requiresGuest && useAuthStore().isAuth) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;

/*

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  auth.loadUserFromCookies(); // Load user data from cookies

  const isAuthenticated = !!auth.token;

  if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'Home' }); // Redirect authenticated users from the login page
  } else {
    next();
  }
*/
