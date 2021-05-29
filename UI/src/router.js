import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "tasks",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "./views/Task.vue"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/meeting",
        name: "meetings",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "./views/Meeting.vue"),
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/auth",
        name: "login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "./views/Login.vue"),
        meta: {
            requiresAuth: false,
        }
    },
    {
        path:"/add",
        name:"Add Task",
        component: () => 
            import("./views/Add.vue"),
        meta: {
            requiresAuth:true,
        }
    },
    {
        path:"/register",
        name:"Register",
        component: () => 
            import("./views/Register.vue"),
        meta: {
            requiresAuth:false,
        }
    }
];

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/auth')
    } else {
        next()
    }
});

router.onReady(() => {
    history.replaceState(
        "",
        document.title,
        window.location.pathname + window.location.search
    );
});

export default router;
